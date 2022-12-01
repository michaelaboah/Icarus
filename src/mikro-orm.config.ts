import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import AmplifierItem from "./entities/categories/AmplifierItem";
import ComputerItem from "./entities/categories/ComputerItem";
import ConsoleItem from "./entities/categories/ConsoleItem";
import MicrophoneItem from "./entities/categories/MicrophoneItem";
import MonitoringItem from "./entities/categories/MonitoringItem";
import NetworkItem from "./entities/categories/NetworkItem";
import ProcessingItem from "./entities/categories/ProcessingItem";
import RFItem from "./entities/categories/RFItem";
import { SpeakerItem } from "./entities/categories/SpeakerItem";
import Equipment from "./entities/Equipment";
import Item from "./entities/Item";
import Post from "./entities/Post";
import RFBand from "./entities/RFBand";
import User from "./entities/User";
import { IEquipment } from "./EntityInterfaces/IEquipment";
import { IGeneric } from "./EntityInterfaces/IGeneric";

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
