import "@/css/index.css"

import { routing } from "@/utils/i18n/routing"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { ThemeProvider } from "next-themes"
import getConfig from "next/config"
import localFont from "next/font/local"
import Header from "@/components/header"
import { notFound } from "next/navigation"
import GoogleAnalytics from "~/lib/components/mini/analytics/google"
import BaiDuAnalytics from "~/lib/components/mini/analytics/baidu"
import Toast from "@/components/toast"
import { SidebarInset, SidebarProvider } from "~/lib/components/shadcn/ui/sidebar"
import Siderbar from "@/components/siderbar"

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={miSansFont.className}>
        <ThemeProvider attribute="class" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <GoogleAnalytics></GoogleAnalytics>
            <BaiDuAnalytics></BaiDuAnalytics>
            <Toast></Toast>

            {/* 为 vaul 抽屉组件包裹一层 */}
            <div data-vaul-drawer-wrapper>
              <SidebarProvider defaultOpen={false}>
                <SidebarInset>
                  <Header></Header>
                  {children}
                </SidebarInset>

                <Siderbar></Siderbar>
              </SidebarProvider>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
