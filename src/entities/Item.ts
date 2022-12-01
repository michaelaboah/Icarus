import { Entity, Property, Enum, OneToOne, Index } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { ObjectType, Field } from "type-graphql";
import { Categories } from "../EntityAbstractions/ItemEnums";
import { IGeneric } from "../EntityInterfaces/IGeneric";
import AmplifierItem from "./categories/AmplifierItem";
import ComputerItem from "./categories/ComputerItem";
import ConsoleItem from "./categories/ConsoleItem";
import MicrophoneItem from "./categories/MicrophoneItem";
import MonitoringItem from "./categories/MonitoringItem";
import NetworkItem from "./categories/NetworkItem";
import ProcessingItem from "./categories/ProcessingItem";
import RFItem from "./categories/RFItem";
import { SpeakerItem } from "./categories/SpeakerItem";

@ObjectType({ implements: [IGeneric] })
@Entity()
export default class Item extends IGeneric {
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

  @Field(() => SpeakerItem, { nullable: true })
  @OneToOne({ nullable: true })
  speaker_item?: SpeakerItem;

  @Field(() => MonitoringItem, { nullable: true })
  @OneToOne({ nullable: true })
  monitoring_item?: MonitoringItem;

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
