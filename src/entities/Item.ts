import { Entity, Index, OneToOne, Property, Enum } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, ObjectType } from "type-graphql";
import { ConsoleItem } from "./categories/ConsoleItem";
import { IGeneric } from "../EntityInterfaces/IGeneric";
import { Categories } from "../EntityAbstractions/ItemEnums";
import { AmplifierItem } from "./categories/AmplifierItem";
import { ProcessingItem } from "./categories/ProcessingItem";
import { ComputerItem } from "./categories/ComputerItem";
import NetworkItem from "./categories/NetworkItem";
import { MicrophoneItem } from "./categories/MicrophoneItem";
import { RFItem } from "./categories/RFItem";

@ObjectType({ implements: [IGeneric] })
@Entity()
export class Item extends IGeneric {
  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

  @Enum(() => Categories)
  @Field(() => Categories)
  category!: Categories;

  @Field(() => AmplifierItem, { nullable: true })
  @OneToOne({ nullable: true })
  amplifier?: AmplifierItem;

  @Field(() => ConsoleItem, { nullable: true })
  @OneToOne({ nullable: true })
  console?: ConsoleItem;

  @Field(() => ComputerItem, { nullable: true })
  @OneToOne({ nullable: true })
  computer?: ComputerItem;

  @Field(() => ProcessingItem, { nullable: true })
  @OneToOne({ nullable: true })
  processor?: ProcessingItem;

  @Field(() => NetworkItem, { nullable: true })
  @OneToOne({ nullable: true })
  network_item?: NetworkItem;

  @Field(() => MicrophoneItem, { nullable: true })
  @OneToOne({ nullable: true })
  microphone?: MicrophoneItem;

  @Field(() => RFItem, { nullable: true })
  @OneToOne({ nullable: true })
  radio_item?: RFItem;

  @Index({ type: "fulltext" })
  @Property({
    type: FullTextType,
    onUpdate: (item: Item) => item.model,
    nullable: true,
  })
  searchableModel?: string;

  @Field(() => [String], { nullable: true })
  @Property({ nullable: true })
  notes?: string[];
}
