import { APP_URL } from "@/constant/app"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // 意思是任何搜索引擎都可以
      userAgent: "*",
      // 允许抓取任何内容
      allow: "/",
      // /private 下的内容不允许
      // disallow: "/private",
    },

    // sitemap的地址
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}
