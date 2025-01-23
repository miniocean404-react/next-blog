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
import { Input } from "~/lib/components/shadcn/ui/input"
import { Separator } from "~/lib/components/shadcn/ui/separator"
import { loginCredentials } from "@/action/singn-up"
import { loginFormSchema, type loginFormSchemaType } from "@/utils/schema/login"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { api } from "@/server/client/react-query-provider"

export default function Login() {
  const t = useTranslations("login")
  const { mutate, error } = api.User.login.useMutation()
  const router = useRouter()

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: loginFormSchemaType) {
    mutate(values, {
      async onSuccess(data, variables, context) {
        await loginCredentials(data)
        // 登录成功，跳到首页
        router.push("/")
      },
      onError(error, variables, context) {
        toast.error(error.message)
      },
    })
  }

  const back = () => {
    router.push("/")
  }

  return (
    <div className="px-4 lg:px-8">
      <Button className="fixed top-4 md:top-8" variant="ghost" onClick={back}>
        <ChevronLeft />
        {t("back")}
      </Button>

      <div className="flex h-dvh items-center justify-center md:mx-0 lg:mx-8">
        <div className="flex w-full flex-col gap-6 md:w-[350px]">
          <div className="flex flex-col items-center gap-2">
            <Image
              className="h-6"
              src={"/favicon.svg"}
              alt={"logo"}
              width={24}
              height={24}
              priority
            />

            <h1 className="text-2xl">{t("card.title")}</h1>
            <p className="text-muted-foreground text-sm">{t("card.desc")}</p>
          </div>

          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
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

                <Button disabled={false} className="w-full" type="submit">
                  {/* <Loader2 className="animate-spin" /> */}
                  {t("card.sure")}
                </Button>

                <div className="relative my-4">
                  <Separator className="absolute top-1/2" orientation="horizontal"></Separator>

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card text-muted-foreground px-2">{t("card.continue")}</span>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <div className="text-center text-sm">
            {t("card.registerTip")}
            <Link className="underline" href={"/passport/register"}>
              {t("card.register")}
            </Link>
          </div>
        </div>

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
    </div>
  )
}
