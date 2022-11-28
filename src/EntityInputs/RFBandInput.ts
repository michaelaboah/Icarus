import { Index } from "@mikro-orm/core";
import { Field, InputType } from "type-graphql";
import { CountryCodes } from "../EntityAbstractions/RFEnums";

@InputType()
export class RFBandInput {
  @Field(() => String, { description: "The shorthand frequency band name." })
  band_name!: string;

  @Field(() => Number, { description: "The lowest possible radio frequency." })
  lower_frequency_range!: number;

  @Field(() => Number, { description: "The highest possible radio frequency." })
  upper_frequency_range!: number;

  @Field(() => String)
  manufacturer!: string;

  @Field(() => CountryCodes)
  nation_code!: CountryCodes;

  @Field(() => Boolean)
  deprecated?: boolean;

  @Index({ type: "fulltext" })
  searchableTitle?: string;
}
