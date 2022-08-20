import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Equipment } from "./entities/Equipment";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}",
  },
  allowGlobalContext: true,
  entities: [Post,  Equipment, User],
    dbName: "athens",
    type: 'postgresql',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];