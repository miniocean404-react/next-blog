import { APP_URL } from "@/constant/link"
import type { Metadata, ResolvingMetadata, Viewport } from "next"
import { getLocale, getTranslations } from "next-intl/server"

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

// https://weijunext.com/article/seo-key-options
// 在页面中也可以设置专属页面 metadata，并与顶级 metadata 进行merge
export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations("app")
  const author = "我是小海洋呀（Miniocean404）"

  return {
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
    creator: `@${author}`,
    authors: [{ url: APP_URL, name: author }],
    // 如果 app 下放了文件就无需设置
    icons: {
      // icon: "/favicon.ico",
      // shortcut: "/favicon.ico",
      // apple: "/favicon.ico",
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
    publisher: author,

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
      // og:image
      // images: [],
      type: "website",
      locale: "zh_CN",
      url: APP_URL,
      siteName: t("appName"),
      title: {
        default: t("appDefaultTitle"),
        template: t("appTitleTemplate"),
      },
      description: t("appDescription"),
    },
    // 这部分配置是为了定义网页在被分享到Twitter时的展现方式：
    // card: 定义了 Twitter 卡片的类型。"summary_large_image"意味着卡片将展示一个大图片以及摘要信息。其他类型还包括"summary"、"app"等。
    // title: Twitter 卡片的标题。
    // description: 对网页内容的简短描述。
    // images: 一个图片 URL 数组，表示要在 Twitter 卡片上展示的图片。这里用的是og.png，它是为社交媒体分享专门设计的图片。
    // creator: Twitter 卡片的创建者的 Twitter 用户名。这有助于引导关注并增加互动。
    twitter: {
      card: "summary_large_image",
      title: {
        default: t("appDefaultTitle"),
        template: t("appTitleTemplate"),
      },
      description: t("appDescription"),
      creator: `@${author}`,
      images: [],
    },
    alternates: {
      canonical: `${APP_URL}/${locale}`,
      languages: { zh: `${APP_URL}/zh`, "zh-CN": `${APP_URL}/zh`, en: `${APP_URL}/en` },
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
