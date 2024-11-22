"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

import { use } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/utils/auth/register"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

const registerFormSchema = z.object({
  email: z.string().email({ message: "无效的邮箱格式" }),
  username: z.string().min(1, { message: "用户名不能为空" }),
  password: z.string().min(6, { message: "密码不能为空,并且密码至少 6 位" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export default function Login({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const { error } = use<{ error: string }>(searchParams)
  const router = useRouter()
  const t = useTranslations("register")

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: RegisterFormSchemaType) {
    const result = await register(values)

    if (result?.error) {
      return toast.error(result.error)
    } else {
      // 注册成功，跳到登录页面
      router.push("/login")
      return { errors: "" }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px] md:w-[400px]">
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("card.username")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("card.usernamePlaceholder")} {...field} />
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
                {t("card.create")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
