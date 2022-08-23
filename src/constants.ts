import { sign } from "jsonwebtoken"
import { User } from "./entities/User"

export const __prod__ = process.env.NODE_ENV !== 'production'
export const __port__ = 4000
export const __sessionSecret__ = "uyfcvbnmkiutrdcvb"
export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m"
    })
}

export const createRefreshToken = (user: User) => {
    return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d"
    })
}