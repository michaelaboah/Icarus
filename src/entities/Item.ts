import { Entity, Index, OneToOne, Property, Enum } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, ObjectType } from "type-graphql";
import { ConsoleItem } from "./categories/ConsoleItem";
import { IGeneric } from "../EntityInterfaces/IGeneric";
import { Categories } from "../EntityAbstractions/Enums";
import { AmplifierItem } from "./categories/AmplifierItem";
import { ProcessingItem } from "./categories/ProcessingItem";

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

  @Field(() => ProcessingItem, { nullable: true })
  @OneToOne({ nullable: true })
  processor?: ProcessingItem;

  @Index({ type: "fulltext" })
  @Property({
    type: FullTextType,
    onUpdate: (item: Item) => item.model,
    nullable: true,
  })
  searchableModel?: string;
}
