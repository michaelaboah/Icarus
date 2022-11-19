import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Category } from "./entities/Category";
import { Item } from "./entities/Item";
import { Equipment } from "./entities/Equipment";
import { IEquipment } from "./EntityInterfaces/IEquipment";
import { IGeneric } from "./EntityInterfaces/IGeneric";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { ConsoleItem } from "./entities/ConsoleItem";
import { ProcessingItem } from "./entities/ProcessingItem";
import { AmplifierItem } from "./entities/AmplifierItem";

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
    AmplifierItem,
    ConsoleItem,
    ProcessingItem,
  ],
  dbName: "athens-dev",
  // user: "pi",
  // password: "dev",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
