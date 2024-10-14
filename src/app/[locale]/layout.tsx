import "@/css/base/index.scss"
import getConfig from "next/config"
import localFont from "next/font/local"

import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"

// 使用next/font来加载谷歌字体，而不是在css到声明字体，因为它帮我们优化了字体的加载，很方便使用各种各样的字体
const miSansFont = localFont({
  src: "../../assets/font/MiSans VF.ttf",
  // 就是 css font-display
  display: "swap",
  weight: "400",
  variable: "--MiSans",
})

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={miSansFont.className}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
