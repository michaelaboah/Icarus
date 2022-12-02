import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  MidiType,
  Protocol,
  SampleRate,
} from "../../EntityAbstractions/ItemEnums";
import {
  PhysicalPort,
  NetworkPort,
} from "../../EntityAbstractions/FieldObjects";
import IElectrical from "../../EntityAbstractions/IElectrical";

@ObjectType()
@InputType("AmplifierItemTest")
@Entity()
export default class AmplifierItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => Int)
  @Property()
  totalInputs: number;

  @Field(() => Int)
  @Property()
  totalOutputs: number;

  @Field(() => MidiType, { nullable: true })
  @Enum(() => MidiType)
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

  @Field(() => SampleRate)
  @Enum(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true, type: JsonType })
  @Field(() => IElectrical, { nullable: true })
  power: IElectrical;
}
