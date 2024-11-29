"use client"

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

import { Card, CardContent, CardHeader, CardTitle } from "~/lib/components/shadcn/ui/card"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/lib/components/shadcn/ui//input-otp"

import { Input } from "~/lib/components/shadcn/ui/input"

import { use, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Separator } from "~/lib/components/shadcn/ui/separator"
import Link from "next/link"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import "swiper/css/bundle"

import { register } from "@/utils/auth/register"
import { trpcClient } from "@/server/trpc/client"
import {
  codeFormSchema,
  registerFormSchema,
  type RegisterFormSchemaType,
} from "@/utils/schema/register"
import { RegisterInfoProvider, useRegisterInfo } from "@/utils/context/register"

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const { error } = use<{ error: string }>(searchParams)
  const router = useRouter()

  return (
    <div className="h-screen flex justify-center items-center mx-8 md:mx-0">
      <RegisterInfoProvider>
        <Swiper
          className="w-96 h-max"
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}
          modules={[]}
        >
          {/* 注册 */}
          <SwiperSlide className="!h-auto">
            <Register />
          </SwiperSlide>

          {/* 验证码 */}
          <SwiperSlide className="!h-auto">
            <VerificationCode />
          </SwiperSlide>

          {/* 成功 */}
          <SwiperSlide className="!h-auto">
            <SuccessRegister />
          </SwiperSlide>
        </Swiper>
      </RegisterInfoProvider>
    </div>
  )
}

function Register() {
  const t = useTranslations("register")
  const swiper = useSwiper()
  const info = useRegisterInfo()

  const registerForm = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    // 当为true的时候，当用户提交了一个验证失败的表单的时候，他会将焦点设置在第一个有错误的字段上面
    shouldFocusError: true,
    //启用浏览器本机验证
    shouldUseNativeValidation: false,
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  async function onRegisterSubmit(values: RegisterFormSchemaType) {
    swiper.slideNext()

    // const result = await register(values)
    // if (result?.error) {
    //   return toast.error(result.error)
    // } else {
    //   await trpcClient.User.sendEmail.query({ email: values.email })
    //   return { errors: "" }
    // }
  }

  return (
    <div className="p-1">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
        </CardHeader>

        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
                control={registerForm.control}
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
                {t("card.next")}
              </Button>

              <div className="relative my-4">
                <Separator className="absolute top-1/2" orientation="horizontal"></Separator>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t("card.continue")}</span>
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                <Link className="underline" href={"/passport/login"}>
                  {t("card.login")}
                </Link>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  )
}

function VerificationCode() {
  const t = useTranslations("register")
  const swiper = useSwiper()

  const codeRef = useRef<HTMLInputElement>(null)

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      pin: "",
    },
  })

  useEffect(() => {
    swiper.on("slideChangeTransitionEnd", () => {
      if (swiper.activeIndex === 1) {
        codeRef.current?.focus()
      }
    })

    return () => {
      swiper.off("slideChangeTransitionEnd")
    }
  }, [])

  const onComplete = (data: string) => {
    codeForm.handleSubmit(onCodeSubmit)()
  }

  async function onCodeSubmit(data: z.infer<typeof codeFormSchema>) {
    const res = await trpcClient.User.verificationToken.query({ token: data.pin })

    if (res?.error) {
      return codeForm.setError("pin", { message: res.error })
    }

    swiper.slideNext()
  }

  return (
    <div className="p-1 w-full h-full flex justify-center items-center">
      <Form {...codeForm}>
        <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={codeForm.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("code.title")}</FormLabel>
                <FormControl ref={codeRef}>
                  {/* destructive */}
                  {/* autoFocus 自动聚焦 */}
                  <InputOTP maxLength={6} onComplete={onComplete} inputMode="numeric" {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator />

                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>{t("code.desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

function SuccessRegister() {
  // router.push("/passport/login")

  return <div>成功</div>
}
