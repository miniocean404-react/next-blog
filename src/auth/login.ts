"use server"

import { getLocale } from "next-intl/server"
import { signIn } from "@/auth/core"
import { AuthError } from "next-auth"
import type { LoginFormSchema } from "@/types/auth"

export const loginCredentials = async (credentials: LoginFormSchema) => {
  const locale = await getLocale()

  try {
    await signIn("credentials", {
      ...credentials,
      redirectTo: `/${locale}/user`,
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
  const locale = await getLocale()
  await signIn("github", { redirectTo: `/${locale}/user` })
}

export const loginGoogle = async () => {
  const locale = await getLocale()

  // 登录完成后，重定向到user页面
  await signIn("google", { redirectTo: `/${locale}/user` })
}
