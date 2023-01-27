import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import Power from "../../EntityAbstractions/Power";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  MidiType,
  Protocol,
  SampleRate,
} from "../../EntityAbstractions/ItemEnums";

@ObjectType()
@InputType("ConsoleInputTest")
@Entity()
export default class ConsoleItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => Int)
  @Property()
  total_inputs: number;

  @Field(() => Int)
  @Property()
  total_outputs: number;

  @Field(() => Int)
  @Property()
  total_busses: number;

  @Field(() => Int)
  @Property()
  physical_inputs: number;

  @Field(() => Int)
  @Property()
  physical_outputs: number;

  @Field(() => Int)
  @Property()
  aux_inputs: number;

  @Field(() => Int)
  @Property()
  physical_aux_inputs: number;

  @Field(() => Int)
  @Property()
  phantom_power_inputs: number;

  @Field(() => Int)
  @Property()
  faders: number;

  @Field(() => Boolean)
  @Property()
  motorized: boolean;

  @Field(() => MidiType, { nullable: true })
  @Enum(() => MidiType)
  midi: MidiType;

  @Property({ nullable: true })
  @Field(() => Int)
  protocol_inputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signal_protocol: Protocol;

  @Property({ default: false })
  @Field(() => Boolean)
  can_expand: boolean;

  @Enum(() => SampleRate)
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true, type: JsonType })
  @Field(() => Power)
  power: Power;
}
