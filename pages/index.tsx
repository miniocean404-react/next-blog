// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import Page from '@/pages/learn/api-use/layout'
import styles from '@/styles/Home.module.scss'
import type { NextPage } from 'next'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Home: NextPage = () => (
  <div className={styles.container}>
    <Page />
  </div>
)

export default Home
