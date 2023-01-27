import {
  MidiType,
  Protocol,
  SampleRate,
} from "../EntityAbstractions/ItemEnums";
import { InputType, Field, Int } from "type-graphql";
import Power from "../EntityAbstractions/Power";

@InputType()
export default class ConsoleInput {
  @Field(() => Int)
  total_inputs: number;

  @Field(() => Int)
  total_outputs: number;

  @Field(() => Int)
  total_busses: number;

  @Field(() => Int)
  physical_inputs: number;

  @Field(() => Int)
  physical_outputs: number;

  @Field(() => Int)
  aux_inputs: number;

  @Field(() => Int)
  physical_aux_inputs: number;

  @Field(() => Int)
  phantom_power_inputs: number;

  @Field(() => Int)
  faders: number;

  @Field(() => Boolean)
  motorized: boolean;

  @Field((_type) => MidiType)
  midi: MidiType;

  @Field(() => Int)
  protocol_inputs: number;

  @Field(() => Protocol)
  signal_protocol: Protocol;

  @Field(() => Boolean)
  can_expand: boolean;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => [String])
  notes: string[];

  @Field(() => String)
  model!: string;

  @Field({ nullable: true })
  searchModel: string;

  @Field(() => Power)
  power: Power;
}
