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
import Power from "../../EntityAbstractions/Power";

@ObjectType()
@InputType("AmplifierItemTest")
@Entity()
export default class AmplifierItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => Int)
  @Property()
  total_inputs: number;

  @Field(() => Int)
  @Property()
  total_outputs: number;

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
  signal_protocol: Protocol;

  @Field(() => SampleRate)
  @Enum(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true, type: JsonType })
  @Field(() => Power, { nullable: true })
  power: Power;
}
