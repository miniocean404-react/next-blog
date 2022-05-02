import styles from '@/styles/Home.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'

const DynamicRoute: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>标题</title>
      <meta name="description" content="描述" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div>动态路由A</div>
  </div>
)

export default DynamicRoute
