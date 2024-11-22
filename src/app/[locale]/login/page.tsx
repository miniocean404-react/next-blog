"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { loginCredentials, loginGithub, loginGoogle } from "@/utils/auth/login"
import Link from "next/link"
import { toast } from "react-hot-toast"

import { Button } from "~/lib/components/shadcn/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/lib/components/shadcn/ui/form"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/lib/components/shadcn/ui/card"
import { Input } from "~/lib/components/shadcn/ui/input"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

const loginFormSchema = z.object({
  email: z.string().email("无效的邮箱格式"),
  password: z.string().min(1, {
    message: "不能为空",
  }),
})

export type loginFormSchemaType = z.infer<typeof loginFormSchema>

export default function Login() {
  const t = useTranslations("login")
  const router = useRouter()

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
    } else {
      // 登录成功，跳到首页
      router.push("/")
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>登录</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{t("card.email")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("card.emailPlaceholder")} {...field} />
                    </FormControl>

                    {/* <FormDescription>这是将显示在您的个人资料和电子邮件中的名称。</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("card.password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("card.passwordPlaceholder")}
                        type="password"
                        aria-autocomplete="list"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button className="w-full" type="submit">
                {t("card.sure")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* <div className="">
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
      </form> */}

      {/* <Link href={"/register"}>去注册</Link> */}
    </div>
  )
}
