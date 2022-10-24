import { Field, Float, InputType, ObjectType } from "type-graphql";

@InputType("Dimensions", {
  description:
    "Inputs for Length (equivalent to Depth), Width, and height. All values are required.",
})
@ObjectType({
  description:
    "Dimensions: Used for storing physical dimentions of items for display or calculations.\n Ex: Calculating volume for bulk item storage",
})
export class Dimension {
  @Field(() => Float)
  width: number;

  @Field(() => Float)
  length: number;

  @Field(() => Float)
  height: number;
}
