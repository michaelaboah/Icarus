import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryKey()
  categoryId: number;

  @Field(() => String)
  @Property({ unique: true })
  categoryName: string;

  // @Field()
  // @Property({ unique: true })
  // categoryType: CategoryType;
}
