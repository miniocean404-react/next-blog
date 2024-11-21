"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { loginCredentials, loginGithub, loginGoogle } from "@/utils/auth/login"
import Link from "next/link"
import { toast } from "react-hot-toast"

const loginFormSchema = z.object({
  email: z.string().email("无效的邮箱格式"),
  password: z.string().min(1, {
    message: "不能为空",
  }),
})

export type loginFormSchemaType = z.infer<typeof loginFormSchema>

export default function Login() {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: loginFormSchemaType) {
    const result = await loginCredentials(values)

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <div className="mt-16">
      <div className="">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input {...form.register("email")} />
          <input {...form.register("password")} />
          <button type="submit">用户名密码 登录</button>
        </form>
      </div>

      <form action={loginGithub}>
        <button>github 登录</button>
      </form>

      <form action={loginGoogle}>
        <button>google 登录</button>
      </form>

      <Link href={"/register"}>去注册</Link>
    </div>
  )
}
