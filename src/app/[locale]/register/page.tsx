"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/lib/components/shadcn/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/lib/components/shadcn/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/lib/components/shadcn/ui/card"

import { Input } from "~/lib/components/shadcn/ui/input"

import { use } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/utils/auth/register"

const registerFormSchema = z.object({
  email: z.string().email({ message: "无效的邮箱格式" }),
  username: z.string().min(1, { message: "用户名不能为空" }),
  password: z.string().min(1, { message: "密码不能为空" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export default function Login({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const { error } = use<{ error: string }>(searchParams)
  const router = useRouter()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const result = await register(values)

    console.log(values)

    if (result?.error) {
      return { errors: result.error }
    } else {
      // 注册成功，跳到登录页面
      router.push("/login")
      return { errors: "" }
    }
  }

  return (
    <div className="mt-32 flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>注册</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">邮箱</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入邮箱" {...field} />
                    </FormControl>

                    {/* <FormDescription>这是将显示在您的个人资料和电子邮件中的名称。</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入用户名" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入密码"
                        type="password"
                        aria-autocomplete="list"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex  justify-center">
          <Button type="submit">创建</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
