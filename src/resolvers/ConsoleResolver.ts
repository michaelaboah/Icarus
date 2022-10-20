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
import { ConsoleItem } from "../entities/IConsole";

// @ObjectType({ implements: [ConsoleItem, IEquipment, IGeneric] })
@InputType()
export class ConsoleInput {
  @Field(() => Int)
  totalInputs: number;

  @Field(() => Int)
  totalOutputs: number;

  @Field(() => Int)
  totalBusses: number;

  @Field(() => Int)
  physicalInputs: number;

  @Field(() => Int)
  physicalOutputs: number;

  @Field(() => Int)
  auxInputs: number;

  @Field(() => Int)
  physicalAuxInputs: number;

  @Field(() => Int)
  phantomPowerInputs: number;

  @Field(() => Int)
  faders: number;

  @Field(() => Boolean)
  motorized: boolean;

  @Field((_type) => MidiType)
  midi: MidiType;

  @Field(() => Int)
  netInputs: number;

  @Field(() => Protocol)
  signalProtocol: Protocol;

  @Field(() => Boolean)
  can_expand: boolean;

  @Field(() => SampleRate)
  max_sample_rate: SampleRate;

  @Field(() => String)
  notes: string;

  @Field(() => String)
  model!: string;

  @Field({ nullable: true })
  searchModel: string;
}

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
