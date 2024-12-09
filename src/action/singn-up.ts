"use server"

import { signIn, signOut } from "@/utils/auth"
import { TRPCError } from "@trpc/server"
import { AuthError, type User } from "next-auth"

export const loginCredentials = async (credentials: User) => {
  try {
    await signIn("credentials", {
      ...credentials,
      redirectTo: `/`,
    })
  } catch (error) {
    if (error instanceof AuthError)
      throw new TRPCError({ code: "BAD_REQUEST", message: "用户名或密码错误" })
    // 这里一定要抛出异常，不然成功登录后不会重定向
    throw error
  }
}

export const loginGithub = async () => {
  await signIn("github", { redirectTo: `/user` })
}

export const loginGoogle = async () => {
  // 登录完成后，重定向到user页面
  await signIn("google", { redirectTo: `/user` })
}

export const logoutCredentials = async () => {
  await signOut()
}
