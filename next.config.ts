import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import path from "path"
import { fileURLToPath } from "url"
import { createContentCollectionPlugin } from "@content-collections/next"
// import {
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_PRODUCTION_BUILD,
//   PHASE_PRODUCTION_SERVER,
// } from "next/constants.js"
// import rehypePrettyCode from "rehype-pretty-code"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = process.env.NODE_ENV === "development"
const isProd = process.env.NODE_ENV === "production"

const config: NextConfig = {
  // export: 会打包为 SSG(静态 html) https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  // standalone：将文件打包，无需安装 node_modules 即可自行部署该文件夹，但不会生成 public 或 .next/static 文件夹，因为理想情况下，这些文件夹应由 CDN 处理
  // output: "standalone",
  distDir: ".next",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: false, // 可防止多渲染一次 DOM
  basePath: process.env.NEXT_PUBLIC_WEB_PREFIX, // 路由前缀
  env: {
    // process.env.customKey
    customKey: "value",
  },
  publicRuntimeConfig: {
    // 服务器，客户端可用
    staticFolder: process.env.NEXT_PUBLIC_WEB_PREFIX,
  },
  // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  serverRuntimeConfig: {
    // 只运行在服务器
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET,
  },
  // CDN 前缀
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  compress: true, // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
  images: {
    // 图像优化(自定义图片链接前缀地址)：https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization
    remotePatterns: [
      {
        protocol: "https", // 图片资源的协议
        hostname: "avatars.githubusercontent.com", // Github 资源的域名
      },
      {
        protocol: "https", // 图片资源的协议
        hostname: "ik.imagekit.io", // Imagekit 资源的域名
      },
    ],
  },
  // sassOptions: {
  // 去除 scss 警告：https://github.com/vercel/next.js/issues/71638
  // silenceDeprecations: ["legacy-js-api"],
  // 添加全局 scss 文件
  // additionalData: '@use "@/css/var/index.var.scss" as var; @use "@/css/mixins/index.mixins.scss" as mixins;',
  // includePaths: [path.join(__dirname, "./src/css")],
  // },
  // i18n: {},
  // Next.js 其实提供了 rewrites 配置项用于重写请求。这算是解决跨域问题常用的一种方式
  // 重写会将传入的请求路径映射到其他目标路径。你可以把它理解为代理，并且它会屏蔽目标路径，使得用户看起来并没有改变其在网站上的位置
  // 跨域处理: https://juejin.cn/post/7366177423775531008?share_token=fc72ebf6-93f2-43e6-9678-6b4fc608378d#heading-7
  async rewrites() {
    return [
      {
        source: "/api/xxx:path*",
        destination: "https://juejin.cn",
      },
    ]
  },
  // https://juejin.cn/post/7338808893529276427?share_token=71e1c1b3-9327-476d-8667-dcdfdf7b0ba9#heading-2
  async headers() {
    return [
      {
        // 在这里，你可以使用正则表达式添加你的来源 URL。
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // 在这里添加你的白名单来源
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
  // 默认 false，是否在构建时忽略 eslint
  // ignoreDuringBuilds: true,
  // 默认false，是否在构建时忽略 typescript 错误
  typescript: {
    ignoreBuildErrors: false,
  },
  // 默认为false,将带有斜杠的 URL 重定向到不带斜杠的对应 URL 类似的网址/about/将重定向到/about
  trailingSlash: false,
  // 默认为 true 是否开启可以优化为静态 html 的提示
  devIndicators: {
    // autoPrerender: false,
  },
  // 可以控制服务器在开发过程中如何处理或保留内存中的构建页面
  onDemandEntries: {
    // 服务器将页面保存在缓冲区中的时间段(毫秒) 默认 25
    maxInactiveAge: 5 * 1000,
    // 应同时保留而不被销毁的页数 默认 2
    pagesBufferLength: 1,
  },
  // 默认为true, 是否禁用 HTTP Keep-Alive
  httpAgentOptions: {
    keepAlive: false,
  },
  // 默认为 true, 默认情况下 Next.js 将添加 x-powered-by 标题
  poweredByHeader: true,
  // 默认为true, Next.js 默认会为每个页面生成 etags 。
  generateEtags: true,
  // 生产模式是否开启 sourceMap
  productionBrowserSourceMaps: false,
  // 用于控制是否将外部依赖项（externals）捆绑到页面的 JavaScript 包中
  bundlePagesRouterDependencies: true,

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // if (isDev) config.devtool = "source-map"

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },

  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    // 局部渲染（Partial Prerendering，PPR）-- 暂时无法使用，需要 next15 测试版本
    // 如果使用了动态函数（如 cookies()、 headers()和未缓存的数据请求），将动态 UI 包装在 Suspense 中，Next.js 会先返回静态 HTML，
    // 然后在同一 HTTP 请求中流式传输动态内容，并对之前的静态 HTML 进行替换
    // export const experimental_ppr = true 路由配置项用于将特定的布局和页面选择到 PPR 中(页面中配置)
    // ppr: true,
    // unstable_after: 它会在响应完成流式处理后安排要处理的工作，从而在不阻塞主要响应的情况下运行辅助任务
    // 在服务端组件、Server Actions、路由处理程序、中间件中都可以使用 after API
    after: true,
  },
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const withPlugin = createContentCollectionPlugin({
  configPath: "./content/content-collections.ts",
})

export default withPlugin(withNextIntl(config))
