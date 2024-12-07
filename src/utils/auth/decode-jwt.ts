import { decode } from "next-auth/jwt"

// https://github.com/nextauthjs/next-auth/issues/5904
export async function decodeJwt(token: string) {
  await decode({
    token,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    salt: "authjs.session-token",
  })
}
