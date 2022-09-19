import styles from '@/styles/Home.module.scss'
import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const DynamicRoute: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>所有路由</title>
      <meta name="description" content="所有路由" />
      <link rel="icon" href={`${publicRuntimeConfig.staticFolder}/favicon.ico`} />
    </Head>

    <h1>所有路由</h1>
  </div>
)

// pages/posts/[[...date]].tsx 可以匹配 /posts 、 /posts/123 、 /posts/2021/7/24
// 可以使用 null 、 [] 、 undefined 或 false 多種不同的方式，讓 Next.js 打包時只產生 / 的頁面
// https://ithelp.ithome.com.tw/articles/10269586
export async function getStaticPaths() {
  return {
    paths: [
      // 字符串生成
      // '/learn/dynamic-route/static/a',

      // 对象变量
      { params: { date: ['1', '2', '3'] } },
    ],
    fallback: true,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context

  // eslint-disable-next-line
  console.log(params)

  return {
    props: {},
  }
}

export default DynamicRoute
