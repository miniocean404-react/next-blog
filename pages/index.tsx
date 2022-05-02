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
      <Link href="/dynamic-route/a">
        <a>去动态路由</a>
      </Link>
    </Button>

    <Button>
      <Link href="/learn/image">
        <a>图片</a>
      </Link>
    </Button>

    <Button>
      <Link href="/learn/static-generation">
        <a>静态生成</a>
      </Link>
    </Button>
  </div>
)

export default Home
