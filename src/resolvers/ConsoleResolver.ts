import { MyContext } from "../@types/resolverTypes";
import { Arg, Ctx, Field, Mutation, ObjectType, Query } from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { ConsoleItem } from "../entities/categories/ConsoleItem";
import { ConsoleInput } from "../EntityInputs/ConsoleInput";

@ObjectType()
class ConsoleResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ConsoleItem)
  console?: ConsoleItem;
}

export class ConsoleResolver {
  // Create
  @Mutation(() => ConsoleResponse)
  async createConsole(
    @Arg("consoleOptions", () => ConsoleInput) consoleOptions: ConsoleInput,
    // @Arg("equipmentInput", () => IEquipmentInput)
    // equipmentInput: IEquipmentInput,
    @Ctx() { em }: MyContext
  ): Promise<ConsoleResponse> {
    const consoleItem = em.create(ConsoleItem, consoleOptions);
    await em.persistAndFlush(consoleItem);
    return { console: consoleItem };
  }
  // Read
  @Query(() => ConsoleResponse)
  async findConsole(
    @Arg("consoleOptions", () => ConsoleInput) consoleOptions: ConsoleInput,
    @Ctx() { em }: MyContext
  ): Promise<ConsoleResponse> {
    const console = await em.findOne(ConsoleItem, consoleOptions);

    if (!console) {
      return {
        errors: [
          {
            field: "Console Error",
            message: `Could not find entered: ${consoleOptions} console`,
          },
        ],
      };
    }

    return { console };
  }

  // Update
  // Destroy
}
