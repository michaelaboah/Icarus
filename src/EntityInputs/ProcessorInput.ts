import { Enum } from "@mikro-orm/core";
import { MidiType, Protocol, SampleRate } from "../EntityAbstractions/Enums";
import { NetworkPort } from "../EntityInterfaces/IGeneric";
import { InputType, Field, Int } from "type-graphql";
import { IElectrical } from "../EntityInterfaces/IElectrical";

@InputType()
export class ProcessorInput {
  @Field(() => Int)
  totalInputs: number;

  @Field(() => Int)
  totalOutputs: number;

  @Field(() => Int)
  physicalInputs: number;

  @Field(() => Int)
  physicalOutputs: number;

  @Field((_type) => MidiType, { nullable: true })
  midi?: MidiType;

  @Field(() => Int)
  protocolInputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => IElectrical)
  power: IElectrical;
}
