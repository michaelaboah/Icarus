import { Entity, Index, OneToOne, Property } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, ObjectType } from "type-graphql";

import { ConsoleItem } from "./ConsoleItem";
import { IGeneric } from "../EntityInterfaces/IGeneric";
import { ProcessingItem } from "./ProcessingItem";

@ObjectType({ implements: [IGeneric] })
@Entity()
export class Item extends IGeneric {
  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

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
