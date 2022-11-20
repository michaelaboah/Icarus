import { Field, Float, InputType, Int, ObjectType } from "type-graphql";
import { Analog, Protocol } from "./Enums";

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

  @Field(() => Number, { nullable: true })
  rack_unit?: number;
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

@InputType("PhysicalConnectivty", {
  description:
    "Addition of physical ports. Various Protocols are handled via the: (Analog Enummeration)",
})
@ObjectType({
  description:
    "Represents Analog for capable equipment. Each object represents a singular port.",
})
export class PhysicalPort {
  @Field(() => Analog)
  connector_type: Analog;

  @Field(() => Int)
  signal_lines: number;

  @Field(() => Boolean)
  input: boolean;
}
