import { Entity, Enum, Property } from "@mikro-orm/core";
import { IElectrical } from "../EntityInterfaces/IElectrical";
import { Field, Int, ObjectType } from "type-graphql";
import { MidiType, Protocol, SampleRate } from "../EntityAbstractions/Enums";
import { IGeneric } from "../EntityInterfaces/IGeneric";

@ObjectType()
@Entity()
export class ConsoleItem extends IGeneric {
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

  @Property({ nullable: true })
  @Field((_type) => MidiType)
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

  @Property({})
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true })
  @Field(() => [String])
  notes: string[];

  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

  @Property({ nullable: true })
  @Field(() => IElectrical)
  power: IElectrical;
}
