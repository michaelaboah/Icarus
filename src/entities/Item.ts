import { Entity, Index, OneToOne, Property } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";

import { Field, ObjectType } from "type-graphql";
import { ItemResult } from "./Enums";
import { ConsoleItem } from "./IConsole";
// import { ConsoleItem } from "./IConsole";
import { IGeneric } from "./IGeneric";

@ObjectType({ implements: [IGeneric] })
@Entity()
export class Item extends IGeneric {
  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

  @Field(() => ItemResult)
  @OneToOne()
  details: typeof ItemResult;

  @Index({ type: "fulltext" })
  @Property({
    type: FullTextType,
    onUpdate: (item: Item) => item.model,
    nullable: true,
  })
  searchableModel?: string;
}
