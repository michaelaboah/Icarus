import { MikroORM } from "@mikro-orm/core";
import { __port__, __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import mikroOrmConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/PostResolver";
import express from "express";
import { EquipmentResolver } from "./resolvers/EquipmentResolver";
import { UserResolver } from "./resolvers/UserResolver";
 
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
    orm.getMigrator().up()

  const app = express();

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
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

    // await orm.getMigrator().up()




};


main().catch(err => {
    console.error(err)
})