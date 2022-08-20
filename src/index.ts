import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
// import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";

import mikroOrmConfig from "./mikro-orm.config";
// import { UserResolver } from "./resolvers/UserResolver";
// import { PostResolver } from "./resolvers/PostResolver";
 
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
//   const apolloServer = new ApolloServer({
//     schema: await buildSchema({
//       resolvers: [],
//       validate: false,
//     }),
//     context: () => ({ em: orm.em }),
//   });

//   await apolloServer.start();
//   apolloServer.applyMiddleware({ app });

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

    // await orm.getMigrator().up()

  const post = orm.em.create(Post, {title: 'hello sql-lite'})  
  await orm.em.persistAndFlush(post)

  console.log(post)
};


main().catch(err => {
    console.error(err)
})