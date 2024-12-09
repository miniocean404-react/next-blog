"use client"

import { loginCredentials } from "@/action/singn-up"
import { api } from "@/server/client/react-query-provider"
import {
  emailSchema,
  registerFormSchema,
  type RegisterFormSchemaType,
} from "@/utils/schema/register"
import { cn } from "@/utils/tw"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useInterval, useSetState } from "react-use"
import { Button } from "~/lib/components/shadcn/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/lib/components/shadcn/ui/form"
import { Input } from "~/lib/components/shadcn/ui/input"
import { Separator } from "~/lib/components/shadcn/ui/separator"

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const { error } = use<{ error: string }>(searchParams)
  const router = useRouter()
  const t = useTranslations("register")
  const [countdown, setCountdown] = useSetState({
    seconds: 60,
    start: false,
  })

  const { mutate: sendEmail, isPending, data } = api.User.sendEmail.useMutation()
  const { mutate: createAccount } = api.User.verificationToken.useMutation()
  const { mutate: login } = api.User.login.useMutation()

  useInterval(
    () => {
      if (countdown.seconds <= 0) return setCountdown({ seconds: 60, start: false })
      setCountdown({ seconds: countdown.seconds - 1 })
    },
    countdown.start ? 1000 : null,
  )

  const registerForm = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    // 当为true的时候，当用户提交了一个验证失败的表单的时候，他会将焦点设置在第一个有错误的字段上面
    shouldFocusError: true,
    // 启用浏览器本机验证
    shouldUseNativeValidation: false,
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      pin: "",
    },
  })

  function onSendEmail() {
    setCountdown({ start: true })
    const email = registerForm.getValues("email")

    sendEmail(
      { email },
      {
        // variables 是传递给请求的参数
        onError(error, variables, context) {
          toast.error(error.message)
        },
      },
    )
  }

  // xxx.handleSubmit(onCodeSubmit)() 可以直接手动提交，不需要按钮
  async function onRegisterSubmit(values: RegisterFormSchemaType) {
    createAccount(
      {
        token: values.pin,
        ...values,
      },
      {
        async onSuccess(data) {
          login(values, {
            async onSuccess(data, variables, context) {
              await loginCredentials(data)
              // 登录成功，跳到首页
              router.push("/")
            },
            onError(error, variables, context) {
              toast.error(error.message)
            },
          })
        },
        onError(error, variables, context) {
          registerForm.setError("pin", { message: error.message })
        },
      },
    )
  }

  return (
    <div className={cn("grid h-dvh items-center px-4", "lg:grid-cols-[4fr_3fr] lg:px-0")}>
      <div className="hidden h-full bg-muted lg:block"></div>

      <div className="flex flex-col gap-6 sm:mx-auto sm:w-[350px]">
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
          <p className="text-sm text-muted-foreground">{t("card.desc")}</p>
        </div>

        <Form {...registerForm}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          >
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{t("card.email")}</FormLabel>
                  {/* 这里使用 ref 可以获取 Input 元素的 ref*/}
                  <FormControl>
                    <Input placeholder={t("card.emailPlaceholder")} {...field} />
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

            <FormField
              control={registerForm.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormControl>
                      <Input
                        placeholder={t("code.desc")}
                        type="text"
                        aria-autocomplete="list"
                        {...field}
                      />
                    </FormControl>

                    <Button
                      type="button"
                      disabled={
                        countdown.start ||
                        !emailSchema.safeParse(registerForm.watch("email")).success
                      }
                      variant={"link"}
                      onClick={onSendEmail}
                    >
                      {/* 后重新发送 */}
                      {countdown.start
                        ? t("code.send", { seconds: countdown.seconds })
                        : t("code.getCode")}
                    </Button>
                  </div>
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
              <Link className="underline" href={"/passport/login"}>
                {t("card.login")}
              </Link>
            </div>
          </form>
        </Form>

        {/* <div className="text-center text-sm">
        {t("card.registerTip")}
        <Link className="underline" href={"/passport/register"}>
          {t("card.register")}
        </Link>
      </div> */}
      </div>
    </div>
  )
}

// <div className="h-mini-layout-one-screen flex justify-center items-center mx-8 md:mx-0">
//   <RegisterInfoProvider>
//     <Swiper
//       className="w-96 h-max"
//       spaceBetween={50}
//       slidesPerView={1}
//       allowTouchMove={false}
//       initialSlide={0}
//       modules={[]}
//     >
//       {/* 注册 */}
//       <SwiperSlide className="!h-auto">
//         <Register />
//       </SwiperSlide>

//       {/* 验证码 */}
//       <SwiperSlide className="!h-auto">
//         <VerificationCode />
//       </SwiperSlide>
//     </Swiper>
//   </RegisterInfoProvider>
// </div>
