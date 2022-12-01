import { Entity, Enum, JsonType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { NetworkType } from "../../EntityAbstractions/ItemEnums";
import { NetworkPort } from "../../EntityAbstractions/FieldObjects";
import IElectrical from "../../EntityAbstractions/IElectrical";

@ObjectType({
  description:
    "Network specific items, handling routing, switching and wireless functionality",
})
@Entity()
export default class NetworkItem {
  @Field(() => Int)
  @PrimaryKey()
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
  @Property({ nullable: true, type: Boolean })
  fiber?: boolean;

  @Field(() => [NetworkPort])
  @Property({ type: JsonType, nullable: true })
  network_connectivity?: NetworkPort[];

  @Field(() => IElectrical)
  @Property({ type: JsonType, nullable: true })
  power?: IElectrical;
}
