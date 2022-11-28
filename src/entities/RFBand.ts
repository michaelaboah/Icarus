import {
  Entity,
  Enum,
  ManyToOne,
  // Index,
  PrimaryKey,
  Property,
  SmallIntType,
} from "@mikro-orm/core";
// import { FullTextType } from "@mikro-orm/postgresql";
import { Field, Int, ObjectType } from "type-graphql";
import { CountryCodes } from "../EntityAbstractions/RFEnums";
import { RFItem } from "./categories/RFItem";

@ObjectType()
@Entity()
export class RFBand {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String, { description: "The shorthand frequency band name." })
  @Property()
  band_name!: string;

  @Field(() => Number, { description: "The lowest possible radio frequency." })
  @Property({ type: SmallIntType })
  lower_frequency_range!: number;

  @Field(() => Number, { description: "The highest possible radio frequency." })
  @Property({ type: SmallIntType })
  upper_frequency_range!: number;

  @Field(() => String)
  @Property()
  nation_code!: string;

  @Field(() => CountryCodes)
  @Enum(() => CountryCodes)
  manufacturer!: CountryCodes;

  @Field(() => Boolean)
  @Property()
  deprecated?: boolean;

  @ManyToOne({ entity: () => RFItem })
  rf_item!: RFItem;
  // @Index({ type: "fulltext" })
  // @Property({ type: FullTextType, onUpdate: (rf: RFBand) => rf.band_name })
  // searchableTitle?: string;
}