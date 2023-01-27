import { MyContext } from "../@types/resolverTypes";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import User from "../entities/User";
import { Response } from "express";
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not Authenticated");
  }

  try {
    //used when there is a pre-fix
    const token = authorization?.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (error) {
    console.log(error);
    throw new Error("Not Authenticated");
  }
  return next();
};

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("PLEX", token, {
    httpOnly: true,
    path: "/refresh_token",
    sameSite: "strict",
  });
};
