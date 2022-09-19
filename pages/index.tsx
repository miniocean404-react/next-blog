// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import Page from '@/pages/learn/api-use/layout'
import styles from '@/styles/Home.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Home: NextPage = () => (
  <div className={styles.container}>
    {/* 在不同的页面组件里写不同的 Meta Data */}
    <Head>
      <title>标题</title>
      <meta name="description" content="描述" />
      <link rel="icon" href={`${publicRuntimeConfig.staticFolder}/favicon.ico`} />
    </Head>

    <Page />
  </div>
)

export default Home
