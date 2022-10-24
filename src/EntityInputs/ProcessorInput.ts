import { Property, Enum } from "@mikro-orm/core";
import { MidiType, Protocol, SampleRate } from "../EntityAbstractions/Enums";
import { NetworkPort } from "../EntityInterfaces/IGeneric";
import { InputType, Field, Int } from "type-graphql";
import { IElectrical } from "../EntityInterfaces/IElectrical";

@InputType()
export class ProcessorInput {
  @Field(() => Int)
  @Property()
  totalInputs: number;

  @Field(() => Int)
  @Property()
  totalOutputs: number;

  @Field(() => Int)
  @Property()
  physicalInputs: number;

  @Field(() => Int)
  @Property()
  physicalOutputs: number;

  @Property({ nullable: true })
  @Field((_type) => MidiType)
  midi?: MidiType;

  @Property({ nullable: true })
  @Field(() => Int)
  protocolInputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Property({})
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true })
  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Property({ nullable: true })
  @Field(() => IElectrical)
  power: IElectrical;
}
