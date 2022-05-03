https://nextjs.org/docs/advanced-features/static-html-export#getinitialprops

```next export```

### 支持的功能 
支持构建静态站点所需的大部分核心 Next.js 功能，包括：

使用时的动态路由getStaticPaths 
预取next/link
预加载 JavaScript
动态导入
任何样式选项（例如 CSS 模块、styled-jsx）
客户端数据获取
getStaticProps
getStaticPaths
使用自定义加载器进行图像优化
### 不支持的功能
不支持需要 Node.js 服务器的功能，或无法在构建过程中计算的动态逻辑：

图像优化（默认加载器）
国际化路由
API 路由
重写
重定向
标头
中间件
增量静态再生
fallback: true
getServerSideProps
