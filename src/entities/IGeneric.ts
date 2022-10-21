import { Field, ID, InputType, InterfaceType, ObjectType } from "type-graphql";
import { PrimaryKey, Property } from "@mikro-orm/core";
import { Protocol } from "./Enums";

@InterfaceType()
export abstract class IGeneric {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  createdAt? = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();
}

@InputType()
export abstract class GenericInput {
  @Field()
  category: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;
}

@InputType("NetworkConnectivty")
@ObjectType()
export class NetworkPort {
  @Field(() => Protocol)
  protocol: Protocol;

  @Field(() => Boolean)
  redundant: boolean;
}
