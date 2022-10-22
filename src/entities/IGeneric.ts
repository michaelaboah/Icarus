import {
  Field,
  Float,
  ID,
  InputType,
  InterfaceType,
  ObjectType,
} from "type-graphql";
import { JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Protocol } from "./Enums";

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

@InputType("Dimensions", {
  description:
    "Inputs for Length (equivalent to Depth), Width, and height. All values are required.",
})
@ObjectType({
  description:
    "Dimensions: Used for storing physical dimentions of items for display or calculations.\n Ex: Calculating volume for bulk item storage",
})
export class Dimension {
  @Field(() => Float)
  width: number;

  @Field(() => Float)
  length: number;

  @Field(() => Float)
  height: number;
}

@InterfaceType()
export abstract class IGeneric {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  createdAt? = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  publicNotes?: string;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  cost?: number;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  weight?: number;

  @Field(() => Dimension, { nullable: true })
  @Property({ type: JsonType, nullable: true })
  dimenstions?: Dimension;
}
