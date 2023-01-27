import { Enum } from "@mikro-orm/core";
import {
  MidiType,
  Protocol,
  SampleRate,
} from "../EntityAbstractions/ItemEnums";
import { InputType, Field, Int } from "type-graphql";
import Power from "../EntityAbstractions/Power";
import { NetworkPort } from "../EntityAbstractions/FieldObjects";

@InputType()
export default class ProcessorInput {
  @Field(() => Int)
  total_inputs: number;

  @Field(() => Int)
  total_outputs: number;

  @Field(() => Int)
  physical_inputs: number;

  @Field(() => Int)
  physical_outputs: number;

  @Field((_type) => MidiType, { nullable: true })
  midi?: MidiType;

  @Field(() => Int)
  protocol_inputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signal_protocol: Protocol;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => Power)
  power: Power;
}
