import { Entity, Enum, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { MidiType, Protocol, SampleRate } from "./Enums";
import { IGeneric, NetworkPort } from "./IGeneric";

@ObjectType()
@InputType("ProcessingInputTest")
@Entity()
export class ProcessingItem extends IGeneric {
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
