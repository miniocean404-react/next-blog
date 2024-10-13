import "@/css/base/index.scss"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import getConfig from "next/config"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
