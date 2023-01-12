import {
  Property,
  SmallIntType,
  Enum,
  Entity,
  JsonType,
  PrimaryKey,
} from "@mikro-orm/core";
import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import {
  NetworkPort,
  PhysicalPort,
} from "../../EntityAbstractions/FieldObjects";
import Power from "../../EntityAbstractions/Power";

export enum SpeakerDriver {
  TWEETER,
  WOOFER,
  SUBWOOFER,
}

registerEnumType(SpeakerDriver, { name: "SpeakerDriver" });
@ObjectType()
@InputType("DriverArrangmentTest")
export class DriverArrangment {
  @Enum(() => SpeakerDriver)
  driver: SpeakerDriver;

  @Field(() => Float, { description: "Diameter of a speaker driver" })
  speaker_size: number; //in inches
}

@ObjectType()
@InputType("SpeakerInputTest")
@Entity()
export class SpeakerItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => DriverArrangment)
  @Property({ type: JsonType })
  driver: DriverArrangment;

  @Field(() => Boolean)
  @Property()
  built_in_processing: boolean;

  @Field(() => Boolean)
  @Property()
  wireless: boolean;

  @Field(() => Float, { description: "Maximum SPL of the speaker." })
  @Property()
  max_spl: number;

  @Field(() => Power)
  @Property({ type: JsonType })
  power: Power;

  @Field(() => Int)
  @Property({ type: SmallIntType })
  lower_frequency_response: number;

  @Field(() => Int)
  @Property({ type: SmallIntType })
  upper_frequency_response: number;

  @Field(() => [String])
  @Property()
  mounting_options?: string[];

  @Field(() => [PhysicalPort])
  @Property({ type: JsonType, nullable: true })
  physical_connectivity?: PhysicalPort[];

  @Field(() => [NetworkPort])
  @Property({ type: JsonType, nullable: true })
  network_connectivity?: NetworkPort[];
}
