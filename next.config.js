const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const path = require('path')

/** 类型来自:@type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  // 开发阶段阶段服务器配置
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      reactStrictMode: true,
      basePath: '/forum', // 路由前缀
      env: {
        customKey: 'value',
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
      ...defaultConfig,
      reactStrictMode: true,
      basePath: '/forum', // 路由前缀
      env: {
        customKey: 'value',
      },
      images: {
        // 图片可用的域名
        domains: ['imgur.com'],
      },
      compress: true, // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
      sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
    }
  }

  // 生产打包配置
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      ...defaultConfig,
      reactStrictMode: true,
      basePath: '/forum', // 路由前缀
      env: {
        customKey: 'value',
      },
      images: {
        // 图片可用的域名
        domains: ['imgur.com'],
      },
      compress: true, // Next.js 提供gzip压缩来压缩渲染的内容和静态文件
      sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
    }
  }

  return defaultConfig
}
