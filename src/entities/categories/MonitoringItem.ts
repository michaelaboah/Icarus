import { Entity, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  NetworkPort,
  PhysicalPort,
} from "../../EntityAbstractions/FieldObjects";
import Power from "../../EntityAbstractions/Power";

@ObjectType()
@InputType("MonitoringInputTest")
@Entity()
export default class MonitoringItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => Boolean, { defaultValue: false })
  @Property({ default: false })
  distro: boolean;

  @Field(() => [NetworkPort])
  @Property({ type: JsonType, nullable: true })
  network_connectivity: NetworkPort[];

  @Field(() => [PhysicalPort], { nullable: true })
  @Property({ type: JsonType, nullable: true })
  physical_connectivity?: PhysicalPort[];

  @Field(() => Power)
  @Property({ type: JsonType, nullable: true })
  power: Power;
}
