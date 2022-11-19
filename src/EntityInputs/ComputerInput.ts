import { Field, InputType, Int } from "type-graphql";
import { NetworkPort } from "../EntityAbstractions/FieldObjects";
import { IElectrical } from "../EntityAbstractions/IElectrical";

@InputType()
export class ComputerInput {
  @Field(() => String)
  processor: string;

  @Field(() => Int)
  ram_size: number;

  @Field(() => Int)
  total_storage: number;

  @Field(() => String, { nullable: true })
  model_year?: Date;

  @Field(() => String, { nullable: true })
  operating_system?: string;

  @Field(() => Boolean)
  dedicated_graphics: boolean;

  @Field(() => [NetworkPort])
  network_connectivity?: NetworkPort[];

  @Field(() => IElectrical)
  power?: IElectrical;
}
