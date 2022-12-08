import { Entity, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  ComputerPort,
  NetworkPort,
} from "../../EntityAbstractions/FieldObjects";
import IElectrical from "../../EntityAbstractions/IElectrical";

@ObjectType({ description: "Representation of any computer based items." })
@InputType("ComputerInputTest")
@Entity()
export default class ComputerItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => String)
  @Property()
  cpu_processor: string;

  @Field(() => Int)
  @Property()
  ram_size: number;

  @Field(() => Int)
  @Property()
  total_storage: number;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  model_year?: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  operating_system?: string;

  @Field(() => Boolean)
  @Property()
  dedicated_graphics: boolean;

  @Property({ type: JsonType, nullable: true })
  @Field(() => [NetworkPort])
  network_connectivity?: NetworkPort[];

  @Field(() => [ComputerPort])
  @Property({ type: JsonType, nullable: true })
  computer_ports?: ComputerPort[];

  @Field(() => IElectrical)
  @Property({ type: JsonType, nullable: true })
  power?: IElectrical;
}
