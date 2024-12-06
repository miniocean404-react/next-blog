"use server"

import { rawApi } from "@/server/client/raw"
import { trpcResult } from "@/server/trpc/shared"
import { signIn, signOut } from "@/utils/auth"
import type { loginFormSchemaType } from "@/utils/schema/login"
import { AuthError } from "next-auth"

export const loginCredentials = async (credentials: loginFormSchemaType) => {
  try {
    const result = await rawApi.User.login.mutate(credentials)

    if (result.code === 200) {
      await signIn("credentials", {
        ...credentials,
        redirectTo: `/`,
      })
    }

    return result
  } catch (error) {
    if (error instanceof AuthError) return trpcResult.failMsg("用户名或密码错误")
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
