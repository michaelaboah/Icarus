import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { IElectrical } from "../EntityAbstractions/IElectrical";
import { Field, Int, ObjectType } from "type-graphql";
import { MidiType, Protocol, SampleRate } from "../EntityAbstractions/Enums";
import { NetworkPort } from "../EntityAbstractions/FieldObjects";

@ObjectType()
@Entity()
export class ProcessingItem {
  @Field(() => Int)
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

  @Enum(() => SampleRate)
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ type: JsonType, nullable: true })
  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => IElectrical)
  @Property({ type: JsonType, nullable: true })
  power: IElectrical;
}
