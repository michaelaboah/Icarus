import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Category } from "./entities/Category";
import { Item } from "./entities/Item";
import { Equipment } from "./entities/Equipment";
import { IEquipment } from "./entities/IEquipment";
import { IGeneric } from "./entities/IGeneric";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { ConsoleItem } from "./entities/IConsole";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}",
  },
  allowGlobalContext: true,
  entities: [
    Post,
    Equipment,
    User,
    Item,
    Category,
    IGeneric,
    IEquipment,
    ConsoleItem,
  ],
  dbName: "athens-dev",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
