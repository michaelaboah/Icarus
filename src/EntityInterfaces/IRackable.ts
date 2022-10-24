import { Property } from "@mikro-orm/core";
import { InterfaceType, Field, Int } from "type-graphql";

@InterfaceType({
  description: "A type for implementing qualities of a rackable item.",
})
export abstract class IRackable {
  @Field(() => Int, {
    nullable: true,
    description:
      "Optional Field to add rack units to item. Only use when rack mounting is possible.",
  })
  @Property({ nullable: true })
  rack_unit?: number;
}
