"use client"

import { getLocale } from "next-intl/server"
import { use } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm } from "react-hook-form"
import z from "zod"
import { loginCredentials, loginGithub, loginGoogle } from "@/auth/login"
import type { LoginFormSchema } from "@/types/auth"

const registerFormSchema = z.object({
  username: z.string().min(1, {
    message: "不能为空",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
})

export default function Login({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const { error } = use<{ error: string }>(searchParams)

  const { register, control, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onRegister(values: LoginFormSchema) {
    // const result = await register(values)
    // if (result?.error) {
    // } else {
    //   // 注册成功，跳到登录页面
    //   router.push("/auth/login")
    // }
  }

  return (
    <div className="mt-16">
      <div className="text-red-500">{error}</div>

      <div className="">
        <form onSubmit={handleSubmit(onRegister)}>
          <input {...register("username")} />
          <input {...register("password")} />
          <button type="submit">注册</button>
        </form>
      </div>

      <form action={loginGithub}>
        <button>github 登录</button>
      </form>

      <form action={loginGoogle}>
        <button>google 登录</button>
      </form>
    </div>
  )
}
