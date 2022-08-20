import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Equipment {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  createdAt? = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  category!: string

  @Field(() => String)
  @Property({ type: "text", unique: true })
  model: string;

  @Field(() => String)
  @Property({ type: "text" })
  publicNotes: string;

  @Field(() => Number)
  @Property({ type: "double" })
  cost: number;

  @Field(() => Number)
  @Property({ type: "double" })
  powerDraw: number;

  @Field(() => String)
  @Property({ type: "text" })
  manufacturer: string;

  @Field(() => Number)
  @Property({ type: "double" })
  weight: number;

  @Field(() => Number)
  @Property({ type: "double" })
  depth: number;

  @Field(() => Int)
  @Property({ type: "int" })
  RU: number;

  @Field(() => String)
  @Property({ type: "text" })
  frequencyRange: string;

}
