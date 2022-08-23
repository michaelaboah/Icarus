import { User } from "../entities/User";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { MyContext } from "src/@types/resolverTypes";
import argon2 from "argon2";
import { createAccessToken, createRefreshToken, __sessionSecret__ } from "../constants";
import { isAuth } from "../utils/isAuth";

@InputType()
export class UserInput {
    @Field()
    username: string

    @Field()
    password: string
}


@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User

    @Field(() => String)
    accessToken?: string
}

@Resolver()
export class UserResolver {

//------------------- CREATE -----------------------
    @Mutation(() => UserResponse)
    async registerUser(
        @Arg("inputOptions", () => UserInput) inputOptions: UserInput,
        @Ctx() { em }: MyContext
        ): Promise<UserResponse>{
            if (inputOptions.username.length < 5) {
                return {
                    errors: [
                        { field: "username", message: "The username is under five characters"}
                    ]
                }
            }
            if (inputOptions.password.length < 5) {
                return {
                    errors: [
                        { field: "password", message: "The password is under five characters"}
                    ]
                }
            }
            const hashedPassword = await argon2.hash(inputOptions.password)
            const user = em.create(User, { username: inputOptions.username, password: hashedPassword})
            
            try {
                await em.persistAndFlush(user)
            } catch (error) {
                if (error.code === "23505"){
                    return {
                        errors: [
                            { field: "username", message: "Username already exists" }
                        ]
                    }
                }
            }
            return { user }
        }

    @Mutation(() => UserResponse)
    async loginUser(
        @Arg("inputOptions", () => UserInput) inputOptions: UserInput,
        @Ctx() { em, res }: MyContext
        ): Promise<UserResponse> {
            const user = await em.findOne(User, { username: inputOptions.username});
            if (!user) {
                return {
                    errors: [{
                        field: 'username',
                        message: "that username doesn't exists"
                    }]
                }
            }
            const valid = await argon2.verify(user.password, inputOptions.password)
            if (!valid){
                return {
                    errors: [{
                        field: 'password',
                        message: "that password doesn't exist"
                    }]
                }
            }

            res.cookie(
                "PLEX", 
                createRefreshToken(user),
                {
                    httpOnly: true,
                }
            )
        
            return { 
                user,
                accessToken: createAccessToken(user)
             }
        }

    //------------------- READ -----------------------

    @Query(() => [User]) 
    users(
        @Ctx() { em }: MyContext
    ){
        return em.find(User, {})
    }
    

    //------------------- UPDATE -----------------------


    //------------------- DELETE -----------------------


    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() { payload }: MyContext
    ) {
        return `your user id is: ${payload!.userId}`

    }
}