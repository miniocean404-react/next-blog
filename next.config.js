const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

/** 类型来自:@type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  // 开发阶段阶段服务器配置
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      basePath: process.env.NEXT_PUBLIC_WEB_PREFIX, // 路由前缀
      env: {
        // process.env.customKey
        customKey: 'value',
      },
      publicRuntimeConfig: {
        // 服务器，客户端可用
        staticFolder: '/static',
      },
      images: {
        // 图片可用的域名
        domains: ['gimg2.baidu.com'],
      },
      compress: true, // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
      sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
    }
  }

  // 生产阶段服务器配置
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      reactStrictMode: true, // 是否启动react严格模式<React.StrictMode>
      distDir: '.next', // 构建目录
      basePath: '/next', // 路由前缀
      env: {
        customKey: 'value',
      },
      images: {
        // 图片可用的域名
        domains: ['imgur.com'],
      },
      sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
      // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
      compress: true,
      // CDN前缀
      assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
      // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => config,
      // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
      serverRuntimeConfig: {
        // 只运行在服务器
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
      },
      publicRuntimeConfig: {
        // 服务器，客户端可用
        staticFolder: '/static',
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
      ignoreDuringBuilds: false,
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
        autoPrerender: false,
      },
    }
  }

  // 生产打包配置
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {}
  }

  return defaultConfig
}
