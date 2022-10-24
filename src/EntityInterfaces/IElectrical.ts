import { Property } from "@mikro-orm/core";
import { PowerConnector } from "../EntityAbstractions/Enums";
import {
  Field,
  Float,
  InputType,
  InterfaceType,
  ObjectType,
} from "type-graphql";

@ObjectType({
  description:
    "Interface for items with potential electrical capabilies. Stored as JSONType.",
})
@InputType("ElectricalInput")
@InterfaceType()
export class IElectrical {
  @Field(() => Float, {
    description:
      "Electrical equipment tend to have a voltage range. Ex: 90V-260V.",
  })
  lower_voltage?: number;

  @Field(() => Float, {
    description:
      "Electrical equipment tend to have a voltage range. Ex: 90V-260V.",
  })
  upper_voltage?: number;

  @Field(() => String, {
    description:
      "Electrical equipment tend to support the typical frequencies found in power mains. 50hz for most of the world and 60hz for the USA.",
  })
  @Property({ nullable: true, default: "50-60" })
  @Field(() => Float, {
    description:
      "Electrical equipment must have a wattage. Ex: 15A. *Note: Please convert Volt-Amperes (VA) to wattage (A).",
  })
  wattage: number;

  @Field(() => Float, {
    description: "Electrical equipment may have a maximum wattage. Ex: 20A.",
  })
  max_wattage: number;

  @Field(() => Boolean, {
    nullable: true,
    description: "Electrical may have redundant power built in.",
  })
  redundant?: boolean;

  @Field(() => PowerConnector, {
    description: "Electrical connector used as power input. EX: Powercon Blue",
  })
  input_connector: PowerConnector;

  @Field(() => PowerConnector, {
    nullable: true,
    description:
      "Electrical connetor for output often daisy chaining. EX: Powercon Grey/White.",
  })
  output_connector?: PowerConnector;
}
