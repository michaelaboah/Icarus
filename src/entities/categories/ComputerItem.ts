import {
  DateType,
  Entity,
  JsonType,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { NetworkPort } from "../../EntityAbstractions/FieldObjects";
import IElectrical from "../../EntityAbstractions/IElectrical";

@ObjectType({ description: "Representation of any computer based items." })
@Entity()
export default class ComputerItem {
  @Field(() => Int)
  @PrimaryKey()
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
  @Property({ nullable: true, type: DateType })
  model_year?: Date;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  operating_system?: string;

  @Field(() => Boolean)
  @Property()
  dedicated_graphics: boolean;

  @Property({ type: JsonType, nullable: true })
  @Field(() => [NetworkPort])
  network_connectivity?: NetworkPort[];

  @Field(() => IElectrical)
  @Property({ type: JsonType, nullable: true })
  power?: IElectrical;
}
