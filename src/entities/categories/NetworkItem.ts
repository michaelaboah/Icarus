import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { NetworkType } from "../../EntityAbstractions/ItemEnums";
import { NetworkPort } from "../../EntityAbstractions/FieldObjects";
import Power from "../../EntityAbstractions/Power";

@ObjectType({
  description:
    "Network specific items, handling routing, switching and wireless functionality",
})
@InputType("NetworkInputTest")
@Entity()
export default class NetworkItem {
  @Field(() => Int, { nullable: true })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => NetworkType)
  @Enum(() => NetworkType)
  network_type!: NetworkType;

  @Field(() => Int)
  @Property()
  poe_ports: number;

  @Field(() => Int)
  @Property()
  max_speed: number;

  @Field(() => Boolean)
  @Property({ default: false, type: Boolean })
  fiber: boolean;

  @Field(() => [NetworkPort])
  @Property({ type: JsonType, nullable: true })
  network_connectivity?: NetworkPort[];

  @Field(() => Power)
  @Property({ type: JsonType, nullable: true })
  power?: Power;
}
