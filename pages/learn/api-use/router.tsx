// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from '@/styles/Home.module.scss'
import { Button } from 'antd'
import type { NextPage } from 'next'
import { useRouter, withRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

const ProgramRouter: NextPage = () => {
  // pathname: String- 当前路线。即页面的路径/pages，配置basePath或locale不包括在内。
  // query: Object- 解析为对象的查询字符串。如果页面没有数据获取要求，则在预渲染期间它将是一个空对象。默认为{}
  // asPath: String- 浏览器中显示的路径（包括查询），没有配置basePath或locale。
  // isFallback: boolean- 当前页面是否处于回退模式。
  // basePath: String- 活动的basePath（如果启用）。
  // locale: String- 活动区域设置（如果启用）。
  // locales: String[]- 所有支持的语言环境（如果启用）。
  // defaultLocale: String- 当前的默认语言环境（如果启用）。
  // domainLocales: Array<{domain, defaultLocale, locales}>- 任何已配置的域区域设置。
  // isReady: boolean- 路由器字段是否在客户端更新并准备好使用。应该只在useEffect方法内部使用，而不是在服务器上进行有条件的渲染。有关具有自动静态优化页面的用例，请参阅相关文档
  // isPreview: boolean- 应用程序当前是否处于预览模式。
  const router = useRouter()

  useEffect(() => {
    // url: String- 新状态的路线。这通常是一个名称page
    // as: String- 将在浏览器中显示的 url
    // options: Object- router.push发送的附加选项
    // 如果cb返回false，Next.js 路由器将不会处理popstate，在这种情况下您将负责处理它
    // eslint-disable-next-line
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== '/' && as !== '/other') {
        // Have SSR render bad routes as a 404.
        window.location.href = as
        return false
      }

      return true
    })

    // 路由事件
    // routeChangeStart(url, { shallow }) - 当路线开始改变时触发
    // routeChangeComplete(url, { shallow }) - 当路线完全改变时触发
    // routeChangeError(err, url, { shallow }) - 更改路线时发生错误或取消路线加载时触发
    // err.cancelled - 指示导航是否被取消
    // beforeHistoryChange(url, { shallow }) - 在更改浏览器历史记录之前触发
    // hashChangeStart(url, { shallow }) - 当哈希值会改变但页面不会改变时触发
    // hashChangeComplete(url, { shallow }) - 当哈希值改变但页面没有改变时触发
    // 这里url是浏览器中显示的 URL，包括basePath.
    const handleRouteChange = (url: string, { shallow }: any) => {
      // eslint-disable-next-line
      console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  const routerClick = useCallback(
    (type: string) => {
      switch (type) {
        case 'img':
          router.push('/learn/api-use/image')
          break
        case 'nest':
          router.push({
            pathname: '/learn/dynamic-route/nest-router/[nested]/[child]',
            query: { nested: 1, child: 2 },
          })
          break
        case 'replace':
          router.replace('/')
          break
        case 'back':
          router.back()
          break
        case 'reload':
          router.reload()
          break
        case 'prefetch':
          // 预读取就是先读取文件内容，等需要时候直接加载，不用等待到时候再渲染的情况
          router.prefetch('/')
          break

        default:
          break
      }
    },
    [router]
  )

  return (
    <div className={styles.container}>
      <Button onClick={() => routerClick('img')}>跳转图片</Button>
      <Button onClick={() => routerClick('nest')}>跳转嵌套路由</Button>
      <Button onClick={() => routerClick('replace')}>替换</Button>
      <Button onClick={() => routerClick('back')}>返回</Button>
      <Button onClick={() => routerClick('reload')}>刷新</Button>
      <Button onClick={() => routerClick('prefetch')}>预读取</Button>
    </div>
  )
}

// withRouter也可以将相同的router对象的属性添加到任何组件的prop中。
// 如果是类式组件需要扩展prop属性 在其中添加 router: NextRouter
export default withRouter(ProgramRouter)
