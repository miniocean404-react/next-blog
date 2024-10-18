import "@/css/base/index.scss"
import getConfig from "next/config"

import { getMessages, unstable_setRequestLocale } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import localFont from "next/font/local"
import { ThemeProvider } from "next-themes"
import ReactLenis from "lenis/react"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

// 使用next/font来加载谷歌字体，而不是在css到声明字体，因为它帮我们优化了字体的加载，很方便使用各种各样的字体
const miSansFont = localFont({
  src: "../../../public/font/MiSans VF.ttf",
  // 就是 css font-display
  display: "swap",
  weight: "400",
  variable: "--MiSans",
})

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages({ locale })

  return (
    // suppressHydrationWarning：关闭水合不匹配报错
    <html suppressHydrationWarning lang={locale}>
      <body className={miSansFont.className}>
        {/* 切换：const { theme, setTheme } = useTheme(); */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ReactLenis root options={{ gestureOrientation: "both" }}>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  )
}
