import { Entity, Index, PrimaryKey, Property } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, Int, ObjectType } from "type-graphql";
// import { IGeneric } from "./IGeneric";
// import { Console } from "./Console";

@ObjectType()
@Entity()
export default class Equipment {
  // -------------------- REQUIRED ------------------

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  created_at? = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at? = new Date();

  @Field(() => String)
  @Property()
  category!: string;

  @Field(() => String)
  @Property({ type: "text" })
  manufacturer: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

  // -------------------- OPTIONAL ------------------

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  public_notes?: string;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  cost?: number;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  powerDraw?: number;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  weight?: number;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  depth?: number;

  @Field(() => Int, { nullable: true })
  @Property({ type: "int", nullable: true })
  rackUnit?: number;

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  frequencyRange?: string;

  @Index({ type: "fulltext" })
  @Property({
    type: FullTextType,
    onUpdate: (equipment: Equipment) => equipment.model,
  })
  searchableModel?: string;
}
