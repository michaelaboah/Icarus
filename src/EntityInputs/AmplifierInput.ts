import {
  MidiType,
  Protocol,
  SampleRate,
} from "../EntityAbstractions/ItemEnums";
import { InputType, Field, Int } from "type-graphql";
import Power from "../EntityAbstractions/Power";
import { PhysicalPort, NetworkPort } from "../EntityAbstractions/FieldObjects";

@InputType()
export default class AmplifierInput {
  @Field(() => Int)
  total_inputs: number;

  @Field(() => Int)
  total_outputs: number;

  @Field(() => MidiType)
  midi: MidiType;

  @Field(() => [PhysicalPort])
  physical_connectivity: PhysicalPort[];

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => Protocol)
  signal_protocol: Protocol;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => [String])
  notes: string[];

  @Field(() => Power)
  power: Power;
}
