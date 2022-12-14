import { Field, InputType, Int, InterfaceType, ObjectType } from "type-graphql";
import { JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Protocol } from "../EntityAbstractions/Enums";
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

@InputType("NetworkConnectivty", {
  description:
    "Addition of network ports. Various Protocols are handled via the: (Protocol Enummeration)",
})
@ObjectType({
  description:
    "Represents RJ45 or Ethernet ports for network capable equipment. Each object represents a singular port",
})
export class NetworkPort {
  @Field(() => Protocol)
  protocol: Protocol;

  @Field(() => Boolean)
  power_over_ethernet?: boolean;
}

@InterfaceType()
export abstract class IGeneric {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String, { description: "Store when item was created." })
  @Property({ type: "date", default: "NOW()" })
  createdAt? = new Date();

  @Field(() => String, { description: "Store when item was last changed." })
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String, {
    nullable: true,
    description: "Global notes for current item.",
  })
  @Property({ type: "text", nullable: true })
  publicNotes: string;

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
