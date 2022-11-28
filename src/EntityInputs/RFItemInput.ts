import { Field, InputType, Int } from "type-graphql";
import { Transmitter, Reciever } from "../entities/categories/RFItem";
import { RFBand } from "../entities/RFBand";
import { RFBandInput } from "./RFBandInput";

@InputType()
export class RFItemInput {
  @Field(() => Int, {
    description:
      "The possible distance a signal can be maintained up to. In feet and with Line-of-Site.",
  })
  physical_range: number;

  @Field(() => Int)
  lower_frequency_response: number;

  @Field(() => Int)
  upper_frequency_response: number;

  @Field(() => [RFBandInput])
  possible_bands: RFBand[];

  @Field(() => Transmitter)
  transmitter?: Transmitter;

  @Field(() => Reciever)
  reciever?: Reciever;
}
