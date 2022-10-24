import { MyContext } from "../@types/resolverTypes";
import { Item } from "../entities/Item";
import { Arg, Ctx, Field, Mutation, ObjectType, Query } from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { ItemInput } from "../EntityInputs/ItemInput";

@ObjectType()
class ItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Item, { nullable: true })
  item?: Item;
}

export class ItemResolver {
  // Create
  @Mutation(() => ItemResponse, { nullable: true })
  async createItem(
    @Arg("itemInput", () => ItemInput) input: ItemInput,
    @Ctx() { em }: MyContext
  ): Promise<ItemResponse | undefined> {
    if (input.processor) {
      const item = em.create(Item, { ...input });
      await em.persistAndFlush(item);

      return { item };
    } else if (input.console) {
      const item = em.create(Item, { ...input });
      await em.persistAndFlush(item);
      return { item };
    }

    return {
      errors: [
        {
          field: "Console Error",
          message: `Could not find entered: ${JSON.stringify(input)} Item`,
        },
      ],
    };
  }
  // Read
  @Query(() => ItemResponse)
  async findItem(
    @Arg("model", () => String) model: string,
    @Ctx() { em }: MyContext
  ): Promise<ItemResponse> {
    const item = await em.findOne(Item, { model }, { populate: true });

    if (!item) {
      return {
        errors: [
          {
            field: "Console Error",
            message: `Could not find entered: ${model} Item`,
          },
        ],
      };
    }

    return { item };
  }

  @Query(() => [ItemResponse])
  findAllItems(@Ctx() { em }: MyContext) {
    return em.find(Item, {});
  }

  @Query(() => [Item])
  async fuzzyItemSearch(
    @Arg("model", () => String) model: string,
    @Ctx()
    { em }: MyContext
  ) {
    const items = await em.find(
      Item,
      { model: { $like: `%${model}%` } },
      { populate: true }
    );

    return items;
  }
  // Update
  // Destroy
}
