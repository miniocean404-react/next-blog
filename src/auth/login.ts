"use server"

import type { loginFormSchemaType } from "@/app/[locale]/login/page"
import { signIn } from "@/auth/core"
import { AuthError } from "next-auth"

export const loginCredentials = async (credentials: loginFormSchemaType) => {
  try {
    await signIn("credentials", {
      ...credentials,
      redirectTo: `/user`,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "用户名或密码错误",
      }
    }

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
