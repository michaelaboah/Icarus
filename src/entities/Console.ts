import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Console {
  @Field(() => Int)
  @PrimaryKey()
  consoleId!: number;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  manufacturer: string;
}
