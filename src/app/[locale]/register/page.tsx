"use client"

import { use } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { register } from "@/auth/register"
import { useRouter } from "next/navigation"

const registerFormSchema = z.object({
  username: z.string().min(1, {
    message: "不能为空",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  email: z.string().email({ message: "无效的邮箱格式" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export default function Login({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const { error } = use<{ error: string }>(searchParams)
  const router = useRouter()

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  async function onRegister(values: RegisterFormSchemaType) {
    const result = await register(values)
    if (result?.error) {
    } else {
      // 注册成功，跳到登录页面
      router.push("/login")
    }
  }

  return (
    <div className="mt-16">
      <div className="">
        <form onSubmit={form.handleSubmit(onRegister)}>
          <input {...form.register("email")} />
          <input {...form.register("username")} />
          <input {...form.register("password")} />
          <button type="submit">注册</button>
        </form>
      </div>

      <div>{form.formState.errors.email?.message}</div>

      <div className="text-red-500">{error}</div>
    </div>
  )
}
