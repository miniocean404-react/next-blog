// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from '@/styles/Home.module.scss'
import { Button } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => (
  <div className={styles.container}>
    {/* 在不同的页面组件里写不同的 Meta Data */}
    <Head>
      <title>标题</title>
      <meta name="description" content="描述" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {/* 路由使用 */}
    <Button>
      <Link href="/learn/dynamic-route/static/a">静态生成动态路由</Link>
    </Button>
    <Button>
      <Link href="/learn/dynamic-route/2/3">嵌套静态生成动态路由</Link>
    </Button>
    <Button>
      <Link href="/learn/dynamic-route/server/xbox">服务端动态路由</Link>
    </Button>

    <Button>
      <Link href="/learn/api-use/image">图片</Link>
    </Button>

    <Button>
      <Link href="/learn/static-route/static-generation?a=1">静态生成</Link>
    </Button>
    <Button>
      <Link href="/learn/static-route/server-side-rendering?category=xbox">服务端渲染</Link>
    </Button>
  </div>
)

export default Home
