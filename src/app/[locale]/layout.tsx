import "@/css/base/index.scss"
import getConfig from "next/config"
import localFont from "next/font/local"

import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages({ locale })
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
