import { Field, InputType } from "type-graphql";
import { Analog, MicrophoneType } from "../EntityAbstractions/ItemEnums";

@InputType()
export default class MicrophoneInput {
  @Field()
  max_spl: number;

  @Field(() => Boolean, { nullable: true })
  phantom?: boolean;

  @Field(() => Boolean, { nullable: true })
  low_cut?: boolean;

  @Field(() => Boolean, { nullable: true })
  pad?: boolean;

  @Field({ nullable: true })
  diaphragm_size?: number;

  @Field({ nullable: true })
  output_impedance?: number;

  @Field({ nullable: true })
  frequency_response: string;

  @Field(() => Analog, { nullable: true })
  connector: Analog;

  @Field(() => [MicrophoneType], { nullable: true })
  microphone_type: MicrophoneType[];
}
