import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  MidiType,
  Protocol,
  SampleRate,
} from "../../EntityAbstractions/ItemEnums";
import {
  NetworkPort,
  PhysicalPort,
} from "../../EntityAbstractions/FieldObjects";
import Power from "../../EntityAbstractions/Power";

@ObjectType()
@InputType("ProcessingItemTest")
@Entity()
export default class ProcessingItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  processor_id!: number;

  @Field(() => Int)
  @Property()
  total_inputs: number;

  @Field(() => Int)
  @Property()
  total_outputs: number;

  @Field(() => Int)
  @Property()
  physical_inputs: number;

  @Field(() => Int)
  @Property()
  physical_outputs: number;

  @Field((_type) => MidiType)
  @Enum({ items: () => MidiType, nullable: true })
  midi?: MidiType;

  @Property({ nullable: true })
  @Field(() => Int)
  protocol_inputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signal_protocol: Protocol;

  @Enum(() => SampleRate)
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ type: JsonType, nullable: true })
  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => [PhysicalPort])
  @Property({ type: JsonType, nullable: true })
  physical_connectivity: PhysicalPort[];

  @Field(() => Power)
  @Property({ type: JsonType, nullable: true })
  power: Power;
}
