import "@/css/base/index.scss"
import getConfig from "next/config"
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  // Providing all messages to the client
  // side is the easiest way to get started

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
