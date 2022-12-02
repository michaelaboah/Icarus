import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Analog, MicrophoneType } from "../../EntityAbstractions/ItemEnums";

@ObjectType()
@InputType("MicrophoneInputTest")
@Entity()
export default class MicrophoneItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field()
  @Property()
  max_spl: number;

  @Field(() => Boolean, { nullable: true })
  @Property({ nullable: true })
  phantom?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Property({ nullable: true })
  low_cut?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Property({ nullable: true })
  pad?: boolean;

  @Field({ nullable: true })
  @Property({ nullable: true })
  diaphragm_size?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  output_impedance?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  frequency_response: string;

  @Field(() => Analog, { nullable: true })
  @Enum({ nullable: true })
  connector: Analog;

  @Field(() => [MicrophoneType], { nullable: true })
  @Property({ nullable: true })
  microphone_type: MicrophoneType[];
}
