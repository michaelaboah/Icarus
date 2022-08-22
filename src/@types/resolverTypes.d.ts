import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response, Express } from "express";
import { User } from "../entities/User"
export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response
}

declare module "express-session" {
  interface SessionData {
    user: User
    userId: number
  }
}