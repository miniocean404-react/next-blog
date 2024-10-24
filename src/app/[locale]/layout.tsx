import "@/css/base/var.scss"
import "@/css/base/index.css"

import { routing } from "@/i18n/routing"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, unstable_setRequestLocale } from "next-intl/server"
import { ThemeProvider } from "next-themes"
import getConfig from "next/config"
import localFont from "next/font/local"
import Header from "@/components/header"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const miSansFont = localFont({
  src: "../../../public/font/MiSans VF.ttf",
  // 就是 css font-display
  display: "swap",
  weight: "400",
  variable: "--MiSans",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = await params
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={miSansFont.className}>
        {/* 切换：const { theme, setTheme } = useTheme(); */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Header></Header>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
