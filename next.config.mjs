import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from "next/constants.js"
import path from "path"

const isProd = process.env.NODE_ENV === "production"

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  let config

  // 开发阶段阶段服务器配置
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /**
     * @type {import('next').NextConfig}
     */
    config = {
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
      images: {
        // 图片可用的域名
        domains: ["gimg2.baidu.com"],
      },
      compress: true, // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
      sassOptions: {
        // 添加全局 scss 文件
        // additionalData: '@import "@/styles/index.scss";',
        includePaths: [path.join("./src/css")],
      },
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
                value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            ],
          },
        ]
      },
    }
  }

  // 生产阶段服务器配置 生产打包配置
  if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    /**
     * @type {import('next').NextConfig}
     */
    config = {
      reactStrictMode: false, // 是否启动react严格模式<React.StrictMode>
      distDir: ".next", // 构建目录
      basePath: process.env.NEXT_PUBLIC_WEB_PREFIX, // 路由前缀
      env: {
        customKey: "value",
      },
      images: {
        // 图片可用的域名
        domains: ["imgur.com"],
        remotePatterns: [
          {
            protocol: "https", //图片资源的协议
            hostname: "www.test.com", //图片资源的域名
          },
        ],
      },
      sassOptions: {
        includePaths: [path.join("./src/css")],
      },
      // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
      compress: true,
      // CDN前缀
      // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
      // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => config,
      // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
      serverRuntimeConfig: {
        // 只运行在服务器
        mySecret: "secret",
        secondSecret: process.env.SECOND_SECRET,
      },
      publicRuntimeConfig: {
        // 服务器，客户端可用
        staticFolder: process.env.NEXT_PUBLIC_WEB_PREFIX,
      },
      // 默认为true, 默认情况下 Next.js 将添加x-powered-by标题
      poweredByHeader: true,
      // 默认为true, Next.js 默认会为每个页面生成etags 。
      generateEtags: true,
      // 默认为true, 是否禁用HTTP Keep-Alive
      httpAgentOptions: {
        keepAlive: false,
      },
      // 可以控制服务器在开发过程中如何处理或保留内存中的构建页面
      onDemandEntries: {
        // 服务器将页面保存在缓冲区中的时间段(毫秒)
        maxInactiveAge: 25 * 1000,
        // 应同时保留而不被销毁的页数
        pagesBufferLength: 2,
      },
      // 默认false，是否在构建时忽略eslint
      // ignoreDuringBuilds: false,
      // 默认false，是否在构建时忽略typescript错误
      typescript: {
        ignoreBuildErrors: false,
      },
      // 默认为false,将带有斜杠的 URL 重定向到不带斜杠的对应 URL 类似的网址/about/将重定向到/about
      trailingSlash: false,
      // 默认为true 是否优化字体
      optimizeFonts: true,
      // 默认为true 是否开启可以优化为静态html的提示
      devIndicators: {
        // autoPrerender: false,
      },
    }
  }

  return config || defaultConfig
}
