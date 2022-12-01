import { Field, InputType } from "type-graphql";
import { NetworkPort, PhysicalPort } from "../EntityAbstractions/FieldObjects";
import IElectrical from "../EntityAbstractions/IElectrical";

@InputType()
export default class MonitoringInput {
  @Field(() => Boolean, { nullable: true })
  distro?: boolean;

  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];

  @Field(() => [PhysicalPort])
  physical_connectivity: PhysicalPort[];

  @Field(() => IElectrical)
  power: IElectrical;
}
