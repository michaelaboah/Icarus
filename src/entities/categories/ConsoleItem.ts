import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import IElectrical from "../../EntityAbstractions/IElectrical";
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
  totalInputs: number;

  @Field(() => Int)
  @Property()
  totalOutputs: number;

  @Field(() => Int)
  @Property()
  totalBusses: number;

  @Field(() => Int)
  @Property()
  physicalInputs: number;

  @Field(() => Int)
  @Property()
  physicalOutputs: number;

  @Field(() => Int)
  @Property()
  auxInputs: number;

  @Field(() => Int)
  @Property()
  physicalAuxInputs: number;

  @Field(() => Int)
  @Property()
  phantomPowerInputs: number;

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
  protocolInputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Property({ nullable: true, default: null })
  @Field(() => Boolean)
  can_expand: boolean;

  @Enum(() => SampleRate)
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true, type: JsonType })
  @Field(() => IElectrical)
  power: IElectrical;
}
