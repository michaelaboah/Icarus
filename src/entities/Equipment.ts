import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Equipment {

  // -------------------- REQUIRED ------------------

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  createdAt? = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  category!: string

  @Field(() => String)
  @Property({ type: "text"})
  manufacturer: string;
  
  @Field(() => String)
  @Property({ type: "text", unique: true})
  model: string;

  // -------------------- OPTIONAL ------------------

  

  @Field(() => String)
  @Property({ type: "text", nullable: true })
  publicNotes?: string;

  @Field(() => Number)
  @Property({ type: "double", nullable: true })
  cost?: number;

  @Field(() => Number)
  @Property({ type: "double", nullable: true }) 
  powerDraw?: number;


  @Field(() => Number)
  @Property({ type: "double", nullable: true })
  weight?: number;

  @Field(() => Number)
  @Property({ type: "double", nullable: true })
  depth?: number;

  @Field(() => Int)
  @Property({ type: "int", nullable: true })
  rackUnit?: number;

  @Field(() => String)
  @Property({ type: "text", nullable: true })
  frequencyRange?: string;

}
