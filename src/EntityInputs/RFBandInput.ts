import { Index } from "@mikro-orm/core";
import { Field, InputType, Int } from "type-graphql";
import { CountryCodes } from "../EntityAbstractions/RFEnums";

@InputType()
export class RFBandInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { description: "The shorthand frequency band name." })
  band_name!: string;

  @Field(() => Number, { description: "The lowest possible radio frequency." })
  lower_frequency_range!: number;

  @Field(() => Number, { description: "The highest possible radio frequency." })
  upper_frequency_range!: number;

  @Field(() => String)
  nation_code!: string;

  @Field(() => CountryCodes)
  manufacturer!: CountryCodes;

  @Field(() => Boolean)
  deprecated?: boolean;

  @Index({ type: "fulltext" })
  searchableTitle?: string;
}
