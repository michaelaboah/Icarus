import { Field, ID, InputType, InterfaceType, ObjectType } from "type-graphql";
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
  dimensions?: Dimension;
}
