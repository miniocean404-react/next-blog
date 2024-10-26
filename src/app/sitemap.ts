import { MetadataRoute } from "next"

const url = "https://blog-miniocean404s.vercel.app"

// 站点地图 可帮助搜索引擎更有效地发现您的网页并为其建立索引，也分为动态和静态两种
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${url}/zh`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${url}/manifest.webmanifest`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/robots.txt`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
