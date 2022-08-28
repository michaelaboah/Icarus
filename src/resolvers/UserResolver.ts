import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { FieldError } from "./EquipmentResolver";
import { MyContext } from "src/@types/resolverTypes";
import argon2 from "argon2";
import { __sessionSecret__ } from "../constants";
import {
  createAccessToken,
  createRefreshToken,
  isAuth,
  sendRefreshToken,
} from "../utils/isAuth";
import { verify } from "jsonwebtoken";

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String)
  accessToken?: string;
}

@Resolver()
export class UserResolver {
  //------------------- CREATE -----------------------
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("inputOptions", () => UserInput) inputOptions: UserInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (inputOptions.email.length < 5) {
      return {
        errors: [
          {
            field: "username",
            message: "The username is under five characters",
          },
        ],
      };
    }
    if (inputOptions.password.length < 5) {
      return {
        errors: [
          {
            field: "password",
            message: "The password is under five characters",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(inputOptions.password);
    const user = em.create(User, {
      email: inputOptions.email,
      password: hashedPassword,
      tokenVersion: 0,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [{ field: "username", message: "Username already exists" }],
        };
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("inputOptions", () => UserInput) inputOptions: UserInput,
    @Ctx() { em, res }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: inputOptions.email });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exists",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, inputOptions.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "that password doesn't exist",
          },
        ],
      };
    }
    // Login successful
    sendRefreshToken(res, createRefreshToken(user));

    return {
      user,
      accessToken: createAccessToken(user),
    };
  }

  //------------------- READ -----------------------

  @Query(() => [User])
  users(@Ctx() { em }: MyContext) {
    return em.find(User, {});
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      throw new Error("Not Authenticated");
    }
    try {
      const token = authorization?.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return context.em.findOne(User, { id: payload.userId });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  //------------------- UPDATE -----------------------

  //------------------- DELETE -----------------------

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }
}
