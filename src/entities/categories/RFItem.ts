import {
  Collection,
  Entity,
  JsonType,
  OneToMany,
  PrimaryKey,
  Property,
  SmallIntType,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Transmitter, Reciever } from "../../EntityAbstractions/RFObjects";
import { RFBand } from "../RFBand";

@ObjectType({ description: "Items that have RF capabilities" })
@Entity()
export class RFItem {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => Int, {
    description:
      "The possible distance a signal can be maintained up to. In feet and with Line-of-Site.",
  })
  @Property()
  physical_range: number;

  @Field(() => Int)
  @Property({ type: SmallIntType })
  lower_frequency_response: number;

  @Field(() => Int)
  @Property({ type: SmallIntType })
  upper_frequency_response: number;

  @Field(() => [RFBand])
  @OneToMany(() => RFBand, (band) => band.rf_item)
  possible_bands = new Collection<RFBand>(this);

  @Field(() => Transmitter)
  @Property({ type: JsonType, nullable: true })
  transmitter?: Transmitter;

  @Field(() => Reciever)
  @Property({ type: JsonType, nullable: true })
  reciever?: Reciever;
}
