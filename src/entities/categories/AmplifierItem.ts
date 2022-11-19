import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { MidiType, Protocol, SampleRate } from "../../EntityAbstractions/Enums";
import {
  PhysicalPort,
  NetworkPort,
} from "../../EntityAbstractions/FieldObjects";
import { IElectrical } from "../../EntityAbstractions/IElectrical";

@ObjectType()
@Entity()
export class AmplifierItem {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => Int)
  @Property()
  totalInputs: number;

  @Field(() => Int)
  @Property()
  totalOutputs: number;

  @Enum(() => MidiType)
  @Field(() => MidiType)
  midi: MidiType;

  @Field(() => [PhysicalPort])
  @Property({ type: JsonType, nullable: true })
  physical_connectivity: PhysicalPort[];

  @Field(() => [NetworkPort])
  @Property({ type: JsonType, nullable: true })
  network_connectivity: NetworkPort[];

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Enum(() => SampleRate)
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true })
  @Field(() => [String])
  notes: string[];

  @Property({ nullable: true, type: JsonType })
  @Field(() => IElectrical)
  power: IElectrical;
}
