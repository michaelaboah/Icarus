import { Field, InputType } from "type-graphql";
import { NetworkType } from "../EntityAbstractions/ItemEnums";
import { NetworkPort } from "../EntityAbstractions/FieldObjects";
import { IElectrical } from "../EntityAbstractions/IElectrical";

@InputType()
export default class NetworkInput {
  @Field(() => NetworkType)
  network_type!: NetworkType;

  @Field(() => Boolean)
  fiber?: boolean;

  @Field(() => [NetworkPort])
  network_connectivity?: NetworkPort[];

  @Field(() => IElectrical)
  power?: IElectrical;
}
