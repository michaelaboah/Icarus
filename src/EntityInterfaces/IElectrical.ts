import { Property } from "@mikro-orm/core";
import { Field, Float, InterfaceType } from "type-graphql";

@InterfaceType({
  description:
    "Interface for items with potential electrical capabilies. When using save as a JSONType.",
})
export abstract class IElectrical {
  @Field(() => Float, {
    description:
      "Electrical equipment tend to have a voltage range. Ex: 90V-260V.",
  })
  @Property({ nullable: true })
  lower_voltage?: number;

  @Field(() => Float, {
    description:
      "Electrical equipment tend to have a voltage range. Ex: 90-260V.`",
  })
  @Property({ nullable: true })
  upper_voltage?: number;

  @Field(() => String, {
    description:
      "Electrical equipment tend to support the typical frequencies found in power mains. 50hz for most of the world and 60hz for the USA.`",
  })
  @Property({ nullable: true, default: "50-60" })
  frequency?: string;

  @Field(() => Float, {
    description:
      "Electrical equipment must have a wattage. Ex: 15A. *Note: Please convert Volt-Amperes (VA) to wattage (A).`",
  })
  @Property()
  wattage: number;

  @Field(() => Float, {
    description: "Electrical equipment may have a maximum wattage. Ex: 20A.`",
  })
  @Property({ nullable: true })
  max_wattage: number;
}
