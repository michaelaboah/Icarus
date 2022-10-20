import { MyContext } from "../@types/resolverTypes";
import { Category } from "../entities/Category";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { FieldError } from "./EquipmentResolver";

@InputType()
class CategoryInput {
  @Field(() => Int, { nullable: true })
  categoryId: number;

  @Field(() => String, { nullable: true })
  categoryName: string;
}

@ObjectType()
class CategoryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Category)
  category?: Category;
}

export class CategoryResolver {
  // Create
  @Mutation(() => CategoryResponse)
  async createCategory(
    @Arg("categoryOptions", () => CategoryInput) categoryOptions: CategoryInput,
    @Ctx() { em }: MyContext
  ): Promise<CategoryResponse | null> {
    const cat = em.create(Category, { ...categoryOptions } as Category);
    await em.persistAndFlush(cat);
    return { category: cat };
  }
  // Read
  @Query(() => CategoryResponse)
  async findCategory(
    @Arg("categoryOptions", () => CategoryInput) categoryOptions: CategoryInput,
    @Ctx() { em }: MyContext
  ): Promise<CategoryResponse> {
    const cat = await em.findOne(Category, { ...categoryOptions });

    if (!cat) {
      return {
        errors: [
          {
            field: "Category Error",
            message: `Could not find entered: ${categoryOptions.categoryName} category`,
          },
        ],
      };
    }

    return { category: cat };
  }

  // Update
  // Destroy
}
