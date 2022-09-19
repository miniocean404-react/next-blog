// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from './index.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'

const Script12306Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>标题</title>
      <meta name="description" content="描述" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </div>
)

export default Script12306Home
