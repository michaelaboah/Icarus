import { Entity, Enum, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { MidiType, Protocol, SampleRate } from "./Enums";
import { IGeneric } from "./IGeneric";

@ObjectType()
@InputType("ConsoleInputTest")
// @InterfaceType()
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

  // @Index({ type: "fulltext" })
  // @Property({
  //   type: FullTextType,
  //   onUpdate: (equipment: IEquipment) => equipment.model,
  // })
  // searchableModel?: string;
}
