import { Property, JsonType } from "@mikro-orm/core";
import { Field, Float, InputType, Int } from "type-graphql";
import { DriverArrangment } from "../entities/categories/SpeakerItem";
import { PhysicalPort, NetworkPort } from "../EntityAbstractions/FieldObjects";
import { IElectrical } from "../EntityAbstractions/IElectrical";

@InputType()
export class SpeakerInput {
  @Property({ type: JsonType })
  driver: DriverArrangment;

  @Field(() => Boolean)
  built_in_processing: boolean;

  @Field(() => Boolean)
  wireless: boolean;

  @Field(() => Float, { description: "Maximum SPL of the speaker." })
  max_spl: number;

  @Field(() => IElectrical)
  power: IElectrical;

  @Field(() => Int)
  lower_frequency_response: number;

  @Field(() => Int)
  upper_frequency_response: number;

  @Field(() => [String])
  mounting_options?: string[];

  @Field(() => [PhysicalPort])
  physical_connectivity?: PhysicalPort[];

  @Field(() => [NetworkPort])
  network_connectivity?: NetworkPort[];
}
