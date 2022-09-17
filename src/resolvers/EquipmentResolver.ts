import { MyContext } from "../@types/resolverTypes";
import { Equipment } from "../entities/Equipment";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
export class EquipmentInput {
  // ------- Mandatory -------

  @Field()
  category: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  // ------- Optional -------

  @Field({ nullable: true })
  cost?: number;

  @Field({ nullable: true })
  powerDraw?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  depth?: number;

  @Field({ nullable: true })
  rackUnit?: number;

  @Field({ nullable: true })
  frequencyRange?: string;

  @Field({ nullable: true })
  publicNotes?: string;

  @Field({ nullable: true })
  searchModel: string;
}

@ObjectType()
export class EquipmentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: [FieldError];

  @Field(() => Equipment, { nullable: true })
  equipment?: Equipment;

  @Field(() => [Equipment], { nullable: true })
  equipmentItems?: [Equipment];
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@Resolver()
export class EquipmentResolver {
  //------------------- CREATE -----------------------
  @Mutation(() => EquipmentResponse, { nullable: true })
  async createEquipment(
    @Arg("inputOptions") inputOptions: EquipmentInput,
    @Ctx() { em }: MyContext
  ): Promise<EquipmentResponse> {
    const equipmentTemplate = {
      category: inputOptions.category,
      model: inputOptions.model,
      manufacturer: inputOptions.manufacturer,
      cost: inputOptions.cost,
      publicNotes: inputOptions.publicNotes,
      powerDraw: inputOptions.powerDraw,
      weight: inputOptions.weight,
      rackUnit: inputOptions.rackUnit,
      frequencyRange: inputOptions.frequencyRange,
      depth: inputOptions.depth,
      searchableModel: inputOptions.model,
    };

    const equipment = em.create(Equipment, equipmentTemplate);
    try {
      await em.persistAndFlush(equipment);
    } catch (error) {
      console.error(error);
      if (error.code === "23505") {
        return {
          errors: [
            { field: "Equipment Model", message: "Duplicate model found" },
          ],
        };
      }
    }
    return { equipment };
  }

  //------------------- READ -----------------------

  @Query(() => Equipment, { nullable: true })
  getEquipment(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Equipment | null> {
    return em.findOne(Equipment, { id });
  }

  @Query(() => [Equipment], { nullable: true })
  getAllEquipment(@Ctx() { em }: MyContext): Promise<Equipment[] | null> {
    return em.find(Equipment, {});
  }

  @Query(() => [Equipment])
  search(
    @Arg("searchModel", () => String) searchModel: string,
    @Ctx() { em }: MyContext
  ) {
    return em.find(Equipment, { model: { $fulltext: searchModel } });
  }

  @Query(() => [Equipment])
  async fuzzyTextSearch(
    @Arg("fuzzySearch", () => String) fuzzySearch: string,
    @Ctx() { em }: MyContext
  ) {
    return em.find(Equipment, { model: { $like: `%${fuzzySearch}%` } });
  }

  //------------------- UPDATE -----------------------
  @Mutation(() => EquipmentResponse, { nullable: true })
  async updateEquipment(
    @Arg("id", () => Int) id: number,
    @Arg("updateOptions", () => EquipmentInput) updateOptions: EquipmentInput,
    // @Arg("model", () => String) model: string,
    // @Arg("manufactuer", () => String, { nullable: true }) manufacturer: string,
    @Ctx() { em }: MyContext
  ): Promise<EquipmentResponse | null> {
    const equipment = await em.findOne(Equipment, { id });
    if (!equipment) return null;
    try {
      Object.keys(updateOptions).forEach((key) => {
        //@ts-expect-error
        if (updateOptions[key] !== "undefined") {
          //@ts-expect-error
          equipment[key] = updateOptions[key];
        }
      });
      await em.persistAndFlush(equipment);
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            { field: "Equipment Model", message: "Duplicate Model Found" },
          ],
        };
      }
    }
    return { equipment };
  }

  //------------------- DELETE -----------------------
  @Mutation(() => Boolean)
  async deleteEquipment(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("model", () => String) model: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    if (id) await em.nativeDelete(Equipment, { id });
    else await em.nativeDelete(Equipment, { model });
    return true;
  }

  @Mutation(() => String)
  async deleteEquipmentRange(
    @Arg("ids", () => [Int]) ids: number[],
    @Ctx() { em }: MyContext
  ): Promise<string> {
    ids.forEach((id) => em.nativeDelete(Equipment, { id }));
    return `Equipment ${ids} have been deleted`;
  }
}
