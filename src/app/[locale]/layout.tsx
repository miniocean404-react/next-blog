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
import { JetBrains_Mono } from "next/font/google"
import { cn } from "@/utils/tw"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

// 无衬线字体，适合文字
const zh_inter = localFont({
  src: "../../../public/font/MiSans VF.ttf",
  // 就是 css font-display
  display: "swap",
  weight: "400",
  // 字体使用的 css 变量定义，就不用 font-family 了
  variable: "--mini-font-family-base",
  fallback: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
})

// 等宽字体，适合代码
const roboto_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--mini-font-family-mono",
  fallback: [
    // 默认用户界面的等宽字体
    "ui-monospace",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
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
    <html
      suppressHydrationWarning
      lang={locale}
      className={cn(zh_inter.variable, roboto_mono.variable)}
    >
      <body>
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
