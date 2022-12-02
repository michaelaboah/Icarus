import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// import { FullTextType } from "@mikro-orm/postgresql";
import { Field, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export default class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String, { description: "Store when item was created." })
  @Property({ type: "date", default: "NOW()" })
  createdAt? = new Date();

  @Field(() => String, { description: "Store when item was last changed." })
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String)
  @Property()
  title!: string;

  // @Index({ type: "fulltext" })
  // @Property({ type: FullTextType, onUpdate: (post: Post) => post.title })
  searchableTitle?: string;
}
