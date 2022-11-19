import { MyContext } from "../@types/resolverTypes";
import { Arg, Ctx, Field, Mutation, ObjectType, Query } from "type-graphql";
import { FieldError } from "./EquipmentResolver";

import { ProcessorInput } from "../EntityInputs/ProcessorInput";
import { ProcessingItem } from "../entities/categories/ProcessingItem";

@ObjectType()
class ProcessingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ProcessingItem)
  processing?: ProcessingItem;
}

export class ProcessingResolver {
  // Create
  @Mutation(() => ProcessingResponse)
  async createProcessor(
    @Arg("processingOptions", () => ProcessorInput)
    processingOptions: ProcessorInput,
    // @Arg("equipmentInput", () => IEquipmentInput)
    // equipmentInput: IEquipmentInput,
    @Ctx() { em }: MyContext
  ): Promise<ProcessingResponse> {
    const processingItem = em.create(ProcessingItem, processingOptions);
    await em.persistAndFlush(processingItem);
    return { processing: processingItem };
  }
  // Read
  @Query(() => ProcessingResponse)
  async findProcessor(
    @Arg("processingOptions", () => ProcessorInput)
    processingOptions: ProcessorInput,
    @Ctx() { em }: MyContext
  ): Promise<ProcessingResponse> {
    const processing = await em.findOne(ProcessingItem, processingOptions);

    if (!processing) {
      return {
        errors: [
          {
            field: "Processor Error",
            message: `Could not find entered: ${processingOptions} processing`,
          },
        ],
      };
    }

    return {} as ProcessingResponse;
  }

  // Update
  // Destroy
}
