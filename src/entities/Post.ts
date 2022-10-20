import { Entity, Index, Property } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, ObjectType } from "type-graphql";
import { IGeneric } from "./IGeneric";

@Entity()
@ObjectType({ implements: IGeneric })
export class Post extends IGeneric {
  @Field(() => String)
  @Property()
  title!: string;

  @Index({ type: "fulltext" })
  @Property({ type: FullTextType, onUpdate: (post: Post) => post.title })
  searchableTitle?: string;
}
