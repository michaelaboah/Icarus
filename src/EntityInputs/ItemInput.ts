import { ConsoleItem } from "../entities/ConsoleItem";
import { ProcessingItem } from "../entities/ProcessingItem";
import { InputType, Field } from "type-graphql";
import { ProcessorInput } from "./ProcessorInput";
import { ConsoleInput } from "./ConsoleInput";
import { Categories } from "../EntityAbstractions/Enums";

@InputType()
export class ItemInput {
  @Field(() => Categories)
  category: Categories;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field(() => String)
  publicNotes: string;

  @Field(() => Number)
  cost: number;

  @Field({ nullable: true })
  weight: number;

  @Field({ nullable: true })
  searchModel?: string;

  @Field(() => ConsoleInput, { nullable: true })
  console?: ConsoleItem;

  @Field(() => ProcessorInput, { nullable: true })
  processor?: ProcessingItem;
}


@InputType()
export class ItemInputEdit {
  @Field(() => Categories)
  category?: Categories;

  @Field()
  model?: string;

  @Field()
  manufacturer?: string;

  @Field(() => String)
  publicNotes?: string;

  @Field(() => Number)
  cost?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  searchModel?: string;

  @Field(() => ConsoleInput, { nullable: true })
  console?: ConsoleItem;

  @Field(() => ProcessorInput, { nullable: true })
  processor?: ProcessingItem;
}
