import { Index, Property } from "@mikro-orm/core";
import { FullTextType } from "@mikro-orm/postgresql";
import { Field, InputType, InterfaceType, ObjectType } from "type-graphql";
import { GenericInput, IGeneric } from "./IGeneric";

@InterfaceType({ implements: IGeneric })
export class IEquipment extends IGeneric {
  // -------------------- REQUIRED ------------------

  @Field(() => String)
  @Property({ type: "text", unique: true })
  model!: string;

  // -------------------- OPTIONAL ------------------

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  publicNotes?: string;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  cost?: number;

  @Field(() => Number, { nullable: true })
  @Property({ type: "double", nullable: true })
  weight?: number;

  @Index({ type: "fulltext" })
  @Property({
    type: FullTextType,
    onUpdate: (equipment: IEquipment) => equipment.model,
  })
  searchableModel?: string;
}

@ObjectType({ implements: GenericInput })
@InputType()
export class IEquipmentInput extends GenericInput {
  @Field({ nullable: true })
  cost?: number;

  @Field({ nullable: true })
  powerDraw?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  publicNotes?: string;

  @Field({ nullable: true })
  searchModel: string;

  @Field()
  model: string;
}
