import { Field, ID, InputType, InterfaceType } from "type-graphql";
import { PrimaryKey, Property } from "@mikro-orm/core";

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
