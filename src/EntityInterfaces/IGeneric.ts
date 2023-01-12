import { Field, InputType, Int, InterfaceType } from "type-graphql";
import { JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Dimension } from "../EntityAbstractions/FieldObjects";

@InputType()
export abstract class GenericInput {
  @Field()
  category: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;
}

@InterfaceType()
export abstract class IGeneric {
  @Field(() => Int, { nullable: true })
  @PrimaryKey()
  id!: number;

  @Field(() => String, { description: "Store when item was created." })
  @Property({ type: "date", default: "NOW()" })
  created_at? = new Date();

  @Field(() => String, { description: "Store when item was last changed." })
  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at? = new Date();

  @Field(() => String, {
    nullable: true,
    description: "Global notes for current item.",
  })
  @Property({ type: "text", nullable: true })
  public_notes: string;

  @Field(() => Number, {
    nullable: true,
    description: "Monetary value of item (in $USD).",
  })
  @Property({ type: "double", nullable: true })
  cost: number;

  @Field(() => Number, {
    nullable: true,
    description: "Storing the wieght of an Item (in lbs)",
  })
  @Property({ type: "double", nullable: true })
  weight?: number;

  @Field(() => Dimension, { nullable: true })
  @Property({ type: JsonType, nullable: true })
  dimensions?: Dimension;
}
