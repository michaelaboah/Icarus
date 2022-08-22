import { MikroORM } from "@mikro-orm/core";
import { __port__, __prod__, __sessionSecret__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mikroOrmConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/PostResolver";
import express from "express";
import { EquipmentResolver } from "./resolvers/EquipmentResolver";
import { UserResolver } from "./resolvers/UserResolver";
import * as redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { MyContext } from "./@types/resolverTypes";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  orm.getMigrator().up()

  const app = express();

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient({
    legacyMode: true
  })
  await redisClient.connect()
    
  app.use(
    session({
        name: 'PLEX',
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,     
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",  //csrf
            // secure: false, // cookie only workes in https
        },
        saveUninitialized: true,
        secret: __sessionSecret__,
        resave: false,
      })
  )
    
  app.get('/', (_req, res) => {
    res.send("hello")
  })

  app.listen(__port__, () => {
    console.log(`Server listening on Port: ${__port__}`)
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, EquipmentResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  




};


main().catch(err => {
    console.error(err)
})