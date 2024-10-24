import { MetadataRoute } from "next"

// 站点地图 可帮助搜索引擎更有效地发现您的网页并为其建立索引，也分为动态和静态两种
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "blog-miniocean404s.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "blog-miniocean404s.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "blog-miniocean404s.vercel.app/zh",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]
}
