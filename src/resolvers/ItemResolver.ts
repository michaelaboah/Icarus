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
import { ConsoleItem } from "../entities/IConsole";
import { ItemResult } from "../entities/Enums";
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

  @Field()
  details: ConsoleItem;
}

@ObjectType()
class ItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Item)
  item?: Item;
}

export class ItemResolver {
  // Create
  @Mutation(() => ItemResponse)
  async createItem(
    @Arg("itemInput", () => ItemInput) input: ItemInput,
    // @Arg("equipmentInput", () => IEquipmentInput)
    // equipmentInput: IEquipmentInput,
    @Ctx() { em }: MyContext
  ): Promise<ItemResponse> {
    // const equip = em.create(IEquipment, { ...equipmentInput });
    // console.log(equip);
    const consoleItem = em.create(Item, input);
    await em.persistAndFlush(consoleItem);
    return { item: consoleItem };
  }
  // Read
  @Query(() => ItemResponse)
  async findItem(
    @Arg("model", () => String) model: string,
    @Ctx() { em }: MyContext
  ): Promise<ItemResponse> {
    const item = await em.findOne(Item, { model });

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

  @Query(() => [ItemResult])
  async findAll(@Ctx() { em }: MyContext): Promise<Array<typeof ItemResult>> {
    const item = await em.find(Item, {});
    console.log(item);
    // const equip = await em.find(Equipment, {})

    return [];
  }
  // Update
  // Destroy
}
