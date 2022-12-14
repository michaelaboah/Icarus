import { IDatabaseDriver, Connection } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response, Express } from "express";
import { User } from "../entities/User";
export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  payload?: { userId: string };
};

declare module "express-session" {
  interface SessionData {
    user: User;
    userId: number;
  }
}
