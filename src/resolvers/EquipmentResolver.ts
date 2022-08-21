import { MyContext } from "../@types/resolverTypes";
import { Equipment } from "../entities/Equipment";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class EquipmentInput {

// ------- Mandatory -------

    @Field()
    category: string

    @Field()
    model: string

    @Field()
    manufactuer: string

// ------- Optional -------

    @Field({ nullable: true })
    cost: number
    
    @Field({ nullable: true })
    powerDraw?: number

    @Field({ nullable: true })
    weight?: number
    
    @Field({ nullable: true })
    depth?: number

    @Field({ nullable: true })
    rackUnit?: number

    @Field({ nullable: true })
    frequencyRange?: string

    @Field({ nullable: true })
    publicNotes?: string
}
@Resolver()
export class EquipmentResolver {
    
   
//------------------- CREATE -----------------------
    @Mutation(() => Equipment, { nullable: true})
    async createEquipment(
        @Arg('inputOptions') inputOptions: EquipmentInput,
        @Ctx() { em }: MyContext
    ): Promise<Equipment | null> {
        const equipmentTemplate = { 
            category: inputOptions.category,
            model: inputOptions.model,
            manufacturer: inputOptions.model,
            cost: inputOptions.cost,
            publicNotes: inputOptions.publicNotes,
            powerDraw: inputOptions.powerDraw,
            weight: inputOptions.weight,
            rackUnit: inputOptions.rackUnit,
            frequencyRange: inputOptions.frequencyRange,
            depth: inputOptions.depth,
        }

        const equipment = em.create(Equipment, equipmentTemplate)
        await em.persistAndFlush(equipment)
        return em.findOne(Equipment, equipmentTemplate)
    }

//------------------- READ -----------------------

    @Query(() => Equipment)
    getEquipment(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Equipment | null> {
        return em.findOne(Equipment, { id })
    }

    @Query(() => [Equipment])
    getAllEquipment(
        @Ctx() { em }: MyContext
    ): Promise<Equipment[]> {
        return em.find(Equipment, {})
    }

//------------------- UPDATE -----------------------    
    @Mutation(() => Equipment, {nullable: true})
    async updateEquipment(
        @Arg("id", () => String, { nullable: true }) oldModel: string,
        @Arg("model", () => String) model: string,
        @Ctx() { em }: MyContext
    ): Promise<Equipment | null>{
        const equipment = await em.findOne(Equipment, { model: oldModel })
        if (!equipment) return null;
        if (typeof model !== "undefined"){
            equipment.model = model
            await em.persistAndFlush(equipment)
        }
        return equipment
    }
//------------------- DELETE -----------------------
    @Mutation(() => Boolean)
    async deleteEquipment(
        @Arg("id", () => Int, {nullable: true}) id: number,
        @Arg("model", () => String) model: string,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        if(id) await em.nativeDelete(Equipment, { id })
        else await em.nativeDelete(Equipment, { model })
        return true
    }

    
    @Mutation(() => String)
    async deleteEquipmentRange(
        @Arg("ids", () => [Int]) ids: number[],
        @Ctx() { em } : MyContext
    ): Promise<string>{
        ids.forEach((id) => em.nativeDelete(Equipment, { id }))
        return `Equipment ${ids} have been deleted`
    }
}   