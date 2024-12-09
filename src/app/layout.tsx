import Eruda from "@/components/eruda"
import Toast from "@/components/toast"
import { GITHUB_LINK } from "@/constant/link"
import { routing } from "@/i18n/routing"
import { TRPCProvider } from "@/server/client/react-query-provider"
import { HydrateClient } from "@/server/client/react-query-server"
import { cn } from "@/utils/tw"
import type { Metadata, ResolvingMetadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { ThemeProvider } from "next-themes"
import { JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import { notFound } from "next/navigation"
import BaiDuAnalytics from "~/lib/components/mini/analytics/baidu"
import GoogleAnalytics from "~/lib/components/mini/analytics/google"

import "@/css/index.css"

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

// https://weijunext.com/article/seo-key-options
// 在页面中也可以设置专属页面 metadata，并与顶级 metadata 进行merge
export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations("app")

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    applicationName: t("appName"),
    title: {
      default: t("appDefaultTitle"),
      template: t("appTitleTemplate"),
    },
    description: t("appDescription"),
    keywords: [
      "博客",
      "小海洋",
      "Miniocean404",
      "Javascript",
      "Vue",
      "Css",
      "Nextjs",
      "React",
      "TypeScript",
      "NextJs",
      "NestJs",
      "Nodejs",
      "Docker",
    ],
    creator: `@${t("author")}`,
    authors: [{ url: GITHUB_LINK, name: t("author") }],
    // 如果 app 下放了文件就无需设置，生成网站：https://realfavicongenerator.net/
    icons: {
      shortcut: "/favicon.ico",
      icon: [
        {
          url: "/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
      ],
      apple: {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      other: [
        {
          url: "/favicon-96x96.png",
        },
      ],
    },

    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("appDefaultTitle"),
      // startUpImage: [],
    },
    // IOS 的网页会尝试检测文本内容中的电话号码、邮箱等数据，将它们转为链接，方便用户交互，这也会导致水合错误
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    category: "分类",
    abstract: "摘要",
    publisher: t("author"),

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // 这部分配置是为了定义网页在被分享到社交媒体平台时的展现方式, OpenGraph，又叫 OG 协议，可以简单的看一下介绍。https://segmentfault.com/a/1190000040863000
    // type: 定义了网站的类型。常见的值包括"website"、"article"等。这里设置为"website"，意味着这是一个普通的网站页面，而不是特定的文章或其他内容类型。
    // locale: 网页的地区和语言设置。
    // url: 网页的完整URL。
    // title: 网页的标题，通常在分享预览中作为大标题显示。
    // description: 网页的简短描述，用于告诉用户这个链接的内容是什么。
    // siteName: 网站的名称，通常用于区分不同的网站源。
    openGraph: {
      // og:url
      // url: "https://www.isaac-wang.com",
      type: "website",
      locale,
      url: "/",
      siteName: t("appName"),
      title: {
        default: t("appDefaultTitle"),
        template: t("appTitleTemplate"),
      },
      description: t("appDescription"),
      images: {
        url: "/favicon-96x96.png",
        width: 96,
        height: 96,
        alt: t("appDefaultTitle"),
      },
    },
    // 这部分配置是为了定义网页在被分享到Twitter时的展现方式：
    // card: 定义了 Twitter 卡片的类型。"summary_large_image"意味着卡片将展示一个大图片以及摘要信息。其他类型还包括"summary"、"app"等。
    // title: Twitter 卡片的标题。
    // description: 对网页内容的简短描述。
    // images: 一个图片 URL 数组，表示要在 Twitter 卡片上展示的图片。这里用的是og.png，它是为社交媒体分享专门设计的图片。
    // creator: Twitter 卡片的创建者的 Twitter 用户名。这有助于引导关注并增加互动。
    twitter: {
      card: "summary_large_image",
      site: `@${t("author")}`,
      title: {
        default: t("appDefaultTitle"),
        template: t("appTitleTemplate"),
      },
      description: t("appDescription"),
      creator: `@${t("author")}`,
      images: {
        url: "/favicon-96x96.png",
        alt: t("appDefaultTitle"),
      },
    },
    alternates: {
      // 因为有 metadataBase 默认 URL 的存在，所以直接写 /
      canonical: "/",
      languages: { zh: "/", "zh-CN": `/zh`, en: `/en` },
    },
  }
}

// 无衬线字体，适合文字
const zh_inter = localFont({
  src: "../../public/font/MiSans VF.ttf",
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

export default async function RootLayout({ children }: LayoutPropsWith) {
  const locale = await getLocale()

  // 确保传入的“区域设置”是有效的
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(zh_inter.variable, roboto_mono.variable)}
    >
      <body>
        <TRPCProvider>
          <HydrateClient>
            <ThemeProvider attribute="class" enableSystem>
              <NextIntlClientProvider messages={messages}>
                <GoogleAnalytics />
                <BaiDuAnalytics />
                <Toast />
                <Eruda />

                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </HydrateClient>
        </TRPCProvider>
      </body>
    </html>
  )
}
