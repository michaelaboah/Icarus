import { MidiType, Protocol, SampleRate } from "../EntityAbstractions/Enums";
import { InputType, Field, Int } from "type-graphql";
import { IElectrical } from "../EntityInterfaces/IElectrical";

@InputType()
export class ConsoleInput {
  @Field(() => Int)
  totalInputs: number;

  @Field(() => Int)
  totalOutputs: number;

  @Field(() => Int)
  totalBusses: number;

  @Field(() => Int)
  physicalInputs: number;

  @Field(() => Int)
  physicalOutputs: number;

  @Field(() => Int)
  auxInputs: number;

  @Field(() => Int)
  physicalAuxInputs: number;

  @Field(() => Int)
  phantomPowerInputs: number;

  @Field(() => Int)
  faders: number;

  @Field(() => Boolean)
  motorized: boolean;

  @Field((_type) => MidiType)
  midi: MidiType;

  @Field(() => Int)
  protocolInputs: number;

  @Field(() => Protocol)
  signalProtocol: Protocol;

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

  @Field(() => IElectrical)
  power: IElectrical;
}
