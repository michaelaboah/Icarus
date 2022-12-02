import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { MidiType, Protocol, SampleRate } from "./Enums";
import { NetworkPort } from "./IGeneric";

@ObjectType()
// @InputType("ProcessingInputTest")
@Entity()
export class ProcessingItem {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

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
}

@InputType()
export class ProcessingInput {
  @Field(() => Int)
  totalInputs: number;

  @Field(() => Int)
  totalOutputs: number;

  @Field(() => Int)
  physicalInputs: number;

  @Field(() => Int)
  physicalOutputs: number;

  @Field((_type) => MidiType)
  midi?: MidiType;

  @Field(() => Int)
  protocolInputs: number;

  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];
}
