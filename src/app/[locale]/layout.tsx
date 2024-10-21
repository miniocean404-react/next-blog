import "./index.module.scss"
import "@/css/base/index.scss"
import { routing } from "@/i18n/routing"
import ReactLenis from "lenis/react"
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

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={miSansFont.className}>
        {/* 切换：const { theme, setTheme } = useTheme(); */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ReactLenis root options={{ gestureOrientation: "both" }}>
            <NextIntlClientProvider messages={messages}>
              <Header></Header>
              {children}
            </NextIntlClientProvider>
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  )
}
