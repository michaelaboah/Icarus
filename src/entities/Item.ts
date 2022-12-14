import { Entity, Index, OneToOne, Property, Enum } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, ObjectType } from "type-graphql";

import { ConsoleItem } from "./ConsoleItem";
import { IGeneric } from "../EntityInterfaces/IGeneric";
import { ProcessingItem } from "./ProcessingItem";
import { Categories } from "../EntityAbstractions/Enums";

@ObjectType({ implements: [IGeneric] })
@Entity()
export class Item extends IGeneric {
  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

  @Enum(() => Categories)
  @Field(() => Categories)
  category!: Categories;

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
