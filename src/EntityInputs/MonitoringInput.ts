import { Field, InputType } from "type-graphql";
import { NetworkPort, PhysicalPort } from "../EntityAbstractions/FieldObjects";
import Power from "../EntityAbstractions/Power";

@InputType()
export default class MonitoringInput {
  @Field(() => Boolean, { defaultValue: false })
  distro: boolean;

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => [PhysicalPort])
  physical_connectivity: PhysicalPort[];

  @Field(() => Power)
  power: Power;
}
