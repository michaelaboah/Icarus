import { Entity, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  NetworkPort,
  PhysicalPort,
} from "../../EntityAbstractions/FieldObjects";
import IElectrical from "../../EntityAbstractions/IElectrical";

@ObjectType()
@InputType("MonitoringInputTest")
@Entity()
export default class MonitoringItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => Boolean, { nullable: true })
  @Property({ nullable: true })
  distro?: boolean;

  @Field(() => [NetworkPort])
  @Property({ type: JsonType, nullable: true })
  network_connectivity: NetworkPort[];

  @Field(() => [PhysicalPort])
  @Property({ type: JsonType, nullable: true })
  physical_connectivity: PhysicalPort[];

  @Field(() => IElectrical)
  @Property({ type: JsonType, nullable: true })
  power: IElectrical;
}
