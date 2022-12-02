import {
  MidiType,
  Protocol,
  SampleRate,
} from "../EntityAbstractions/ItemEnums";
import { InputType, Field, Int } from "type-graphql";
import IElectrical from "../EntityAbstractions/IElectrical";
import { PhysicalPort, NetworkPort } from "../EntityAbstractions/FieldObjects";

@InputType()
export default class AmplifierInput {
  @Field(() => Int)
  totalInputs: number;

  @Field(() => Int)
  totalOutputs: number;

  @Field(() => MidiType, { nullable: true })
  midi: MidiType;

  @Field(() => [PhysicalPort])
  physical_connectivity: PhysicalPort[];

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => [String])
  notes: string[];

  @Field(() => IElectrical)
  power: IElectrical;
}
