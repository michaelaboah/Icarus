import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Item } from "./entities/Item";
import { Equipment } from "./entities/Equipment";
import { IEquipment } from "./EntityInterfaces/IEquipment";
import { IGeneric } from "./EntityInterfaces/IGeneric";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { ConsoleItem } from "./entities/categories/ConsoleItem";
import { AmplifierItem } from "./entities/categories/AmplifierItem";
import { ProcessingItem } from "./entities/categories/ProcessingItem";
import { ComputerItem } from "./entities/categories/ComputerItem";
import NetworkItem from "./entities/categories/NetworkItem";
import { MicrophoneItem } from "./entities/categories/MicrophoneItem";
import { RFBand } from "./entities/RFBand";
import { RFItem } from "./entities/categories/RFItem";
import { SpeakerItem } from "./entities/categories/SpeakerItem";
import MonitoringItem from "./entities/categories/MonitoringItem";

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
    RFBand,
    IGeneric,
    IEquipment,
    AmplifierItem,
    ConsoleItem,
    ComputerItem,
    NetworkItem,
    ProcessingItem,
    MicrophoneItem,
    RFItem,
    SpeakerItem,
    MonitoringItem,
  ],
  dbName: "athens-dev",
  // user: "pi",
  // password: "dev",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
