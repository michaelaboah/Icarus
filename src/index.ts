import { MikroORM } from "@mikro-orm/core";
import { __port__, __prod__, __sessionSecret__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mikroOrmConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/PostResolver";
import express from "express";
import cors from "cors";
import "dotenv/config";
// import { MyContext } from "./@types/resolverTypes";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken,
} from "./utils/isAuth";
import { EquipmentResolver } from "./resolvers/EquipmentResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { ConsoleResolver } from "./resolvers/ConsoleResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ItemResolver } from "./resolvers/ItemResolver";
import { ProcessingResolver } from "./resolvers/ProcessingResolver";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  orm.getMigrator().up();

  const app = express();
  app.use(
    cors({
      origin: [
        "http://localhost:1420",
        "https://studio.apollographql.com",
        "http://localhost:5000",
          // Dev Macbook Pro
        "http://10.0.0.*",
      ],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.get("/", (_req, res) => {
    res.send("hello");
  });

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.PLEX;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      // console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }
    // valid token send back access token
    const user = await orm.em.findOne(User, { id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    // If user is found create and send another Refresh Token
    sendRefreshToken(res, createRefreshToken(user));

    // If user is found create an Access Token
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.listen(__port__, () => {
    console.log(`Server listening on Port: ${__port__}`);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        EquipmentResolver,
        UserResolver,
        ConsoleResolver,
        CategoryResolver,
        ItemResolver,
        ProcessingResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
};

main().catch((err) => {
  console.error(err);
});
