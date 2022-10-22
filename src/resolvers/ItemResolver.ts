import { MyContext } from "../@types/resolverTypes";
import { Item } from "../entities/Item";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { ConsoleItem } from "../entities/ConsoleItem";
import { ProcessingItem } from "../entities/ProcessingItem";

// import { Equipment } from "../entities/Equipment";

// @ObjectType({ implements: [ConsoleItem, IEquipment, IGeneric] })
@InputType()
export class ItemInput {
  @Field()
  category: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field({ nullable: true })
  searchModel?: string;

  @Field(() => ConsoleItem, { nullable: true })
  console?: ConsoleItem;

  @Field(() => ProcessingItem, { nullable: true })
  processor?: ProcessingItem;
}

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
    // @Arg("equipmentInput", () => IEquipmentInput)
    // equipmentInput: IEquipmentInput,
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

    return ({ ...input } as ItemResponse) || null;
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
            message: `Could not find entered: ${model} console`,
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
  // Update
  // Destroy
}
