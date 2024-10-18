import "@/css/base/index.scss"
import getConfig from "next/config"

import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages({ locale })

  return (
    // suppressHydrationWarning：关闭水合不匹配报错
    <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
  )
}
