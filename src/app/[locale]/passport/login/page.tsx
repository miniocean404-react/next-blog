"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
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

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/lib/components/shadcn/ui/card"
import { Input } from "~/lib/components/shadcn/ui/input"
import { Separator } from "~/lib/components/shadcn/ui/separator"
import { loginCredentials } from "@/action/singn-up"
import { loginFormSchema, type loginFormSchemaType } from "@/utils/schema/login"

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

    if (result.code !== 200) {
      toast.error(result.msg)
    } else {
      // 登录成功，跳到首页
      router.push("/")
    }
  }

  return (
    <div className="h-mini-layout-one-screen flex justify-center items-center mx-8 md:mx-0">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl">{t("card.title")}</CardTitle>
          <CardDescription>{t("card.desc")}</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{t("card.email")}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder={t("card.emailPlaceholder")}
                        required
                        {...field}
                      />
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

              <Button className="w-full" type="submit">
                {t("card.sure")}
              </Button>

              <div className="relative my-4">
                <Separator className="absolute top-1/2" orientation="horizontal"></Separator>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t("card.continue")}</span>
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                {t("card.registerTip")}
                <Link className="underline" href={"/passport/register"}>
                  {t("card.register")}
                </Link>
              </div>
            </CardContent>
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

      {/* <Link href={"/passport/register"}>去注册</Link> */}
    </div>
  )
}
