import { MyContext } from "../@types/resolverTypes";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  UseMiddleware,
} from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { wrap } from "@mikro-orm/core";
import { Categories } from "../EntityAbstractions/ItemEnums";
import Item from "../entities/Item";
import ItemInput, { ItemInputEdit } from "../EntityInputs/ItemInput";
import { isAuth } from "../utils/isAuth";

@ObjectType()
class ItemResponse {
  @Field(() => [FieldError], {
    nullable: true,
    description:
      "Potential list of errors that can be generated from a Query or Mutation",
  })
  errors?: FieldError[];

  @Field(() => Item, {
    nullable: true,
    description:
      "Potential Item that comes back as result of a successful Query or Mutation.",
  })
  item?: Item;
}

export default class ItemResolver {
  // Create
  @Mutation(() => ItemResponse, {
    nullable: true,
    description: "Create a new item with optional subfields.",
  })
  @UseMiddleware(isAuth)
  async createItem(
    @Arg("itemInput", () => ItemInput, { description: "" }) input: ItemInput,
    @Ctx() { em }: MyContext
  ): Promise<ItemResponse | undefined> {
    const item = em.create(Item, { ...input });
    try {
      await em.persistAndFlush(item);
    } catch (error) {
      console.error(error);
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "Duplication Error",
              message: `Model: "${item.model}" already exists, cannot have duplicates.`,
              details: error.name,
            },
          ],
        };
      } else {
        return {
          errors: [{ field: "Other", message: `${error}` }],
        };
      }
    }
    return { item };
  }
  // Read
  @Query(() => ItemResponse, {
    description: "Using the complete model name find one value.",
  })
  @UseMiddleware(isAuth)
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

  @Query(() => [Item])
  @UseMiddleware(isAuth)
  async findAllItems(@Ctx() { em }: MyContext) {
    // console.log( await em.find(Item, {}, {populate: true}))
    const allItems = await em.find(Item, {}, { populate: true });
    return allItems;
  }

  @Query(() => [Item])
  @UseMiddleware(isAuth)
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

  @Mutation(() => ItemResponse, {
    description:
      "Update an Item using the exact model name and edit all of the fields.",
  })
  @UseMiddleware(isAuth)
  async updateItem(
    @Arg("model", () => String) model: string,
    @Arg("edits", () => ItemInputEdit) edits: ItemInputEdit,
    @Ctx() { em }: MyContext
  ) {
    const item = await em.findOneOrFail(Item, { model }, { populate: true });

    const sub_items = Object.keys(Categories).map((x) => x.toLowerCase());
    Object.entries(item).forEach(([key, val]) => {
      if (sub_items.includes(key) && val !== null) {
        wrap(item).assign(
          { id: 1, ...edits, [key]: { ...val } },
          { updateByPrimaryKey: false }
        );
      }
    });

    await em.flush();
    return { item };
  }
  // Destroy
}
