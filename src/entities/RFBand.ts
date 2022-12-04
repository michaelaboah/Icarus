import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  SmallIntType,
} from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { CountryCodes } from "../EntityAbstractions/RFEnums";
import RFItem from "./categories/RFItem";

@ObjectType({
  description:
    "And updatable table for managing Radio Frequencies around the world",
})
@InputType("RFBandInputTest")
@Entity()
export default class RFBand {
  @Field(() => Int)
  @PrimaryKey({ autoincrement: true })
  id!: number;
  @ManyToOne("RFItem")
  rf_item!: RFItem;

  @Field(() => String, { description: "The shorthand frequency band name." })
  @Property({ unique: true })
  band_name!: string;

  @Field(() => Number, { description: "The lowest possible radio frequency." })
  @Property({ type: SmallIntType })
  lower_frequency_range!: number;

  @Field(() => Number, { description: "The highest possible radio frequency." })
  @Property({ type: SmallIntType })
  upper_frequency_range!: number;

  @Field(() => String)
  @Property()
  manufacturer!: string;

  @Field(() => CountryCodes)
  @Enum(() => CountryCodes)
  nation_code!: CountryCodes;

  @Field(() => Boolean)
  @Property()
  deprecated?: boolean;
}
