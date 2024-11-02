import { APP_URL } from "@/constant/link"
import { MetadataRoute } from "next"

// 站点地图 可帮助搜索引擎更有效地发现您的网页并为其建立索引，也分为动态和静态两种
// sitemap 是向搜索引擎展示网站结构的工具，可以理解为网站地图。有了 sitemap.xml，搜索引擎可以更高效地爬取网站，确保内容更快地展现在搜索结果中。对于大型的、内容丰富的网站，或是频繁更新的网站，sitemap 带来的效益是非常高的。
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${APP_URL}/en`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${APP_URL}/manifest.webmanifest`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/robots.txt`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
