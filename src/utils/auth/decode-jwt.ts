import { decode } from "next-auth/jwt"

export async function decodeJwt(token: string) {
  await decode({
    token,
    secret: process.env.AUTH_SECRET,
    salt: "authjs.session-token",
  })
}
