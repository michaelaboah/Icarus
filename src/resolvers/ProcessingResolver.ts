import { MyContext } from "../@types/resolverTypes";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Int,
  Query,
} from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { MidiType, Protocol, SampleRate } from "../entities/Enums";
import { ProcessingItem } from "../entities/ProcessingItem";
import { Property, Enum } from "@mikro-orm/core";
import { NetworkPort } from "../entities/IGeneric";

@InputType()
export class ProcessingInput {
  @Field(() => Int)
  @Property()
  totalInputs: number;

  @Field(() => Int)
  @Property()
  totalOutputs: number;

  @Field(() => Int)
  @Property()
  physicalInputs: number;

  @Field(() => Int)
  @Property()
  physicalOutputs: number;

  @Property({ nullable: true })
  @Field((_type) => MidiType)
  midi?: MidiType;

  @Property({ nullable: true })
  @Field(() => Int)
  protocolInputs: number;

  @Enum(() => Protocol)
  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Property({})
  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Property({ nullable: true })
  @Field(() => [NetworkPort])
  network_connectivity: NetworkPort[];
}

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
    @Arg("processingOptions", () => ProcessingInput)
    processingOptions: ProcessingInput,
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
    @Arg("processingOptions", () => ProcessingInput)
    processingOptions: ProcessingInput,
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
