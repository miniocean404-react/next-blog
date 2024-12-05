import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    // userAgent: "*",// 意思是任何搜索引擎都可以
    // disallow: "/", // /xxx 下的内容不允许
    rules: [
      {
        userAgent: "Yisouspider",
        // 允许抓取任何内容
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "bingbot",
        allow: "/",
      },
      {
        userAgent: "Sogou inst spider",
        allow: "/",
      },
      {
        userAgent: "Sogou web spider",
        allow: "/",
      },
      {
        userAgent: "360Spider",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      {
        userAgent: "PetalBot",
        allow: "/",
      },
      {
        userAgent: "*",
        // 允许抓取任何内容
        disallow: "/api",
      },
      {
        userAgent: "*",
        // 允许抓取任何内容
        disallow: "/tprc",
      },
    ],

    // sitemap的地址
    sitemap: [`${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`],
  }
}
