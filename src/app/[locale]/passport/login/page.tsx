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

  const back = () => {
    router.push("/")
  }

  return (
    <div className="px-4 lg:px-8">
      <Button className="fixed top-4 md:top-8" variant="ghost" onClick={back}>
        <ChevronLeft />
        {t("back")}
      </Button>

      <div className="h-dvh flex justify-center items-center lg:mx-8 md:mx-0">
        <div className="w-full md:w-[350px] flex flex-col gap-6">
          <div className="flex flex-col gap-2 items-center">
            <Image
              className="h-6"
              src={"/favicon.svg"}
              alt={"logo"}
              width={24}
              height={24}
              priority
            />

            <h1 className="text-2xl">{t("card.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("card.desc")}</p>
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
                    <span className="bg-card px-2 text-muted-foreground">{t("card.continue")}</span>
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
