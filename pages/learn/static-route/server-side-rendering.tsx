import { getProductsByCategory } from '@/pages/api/products/[category]'
import styles from '@/styles/Home.module.scss'
import type { Prop } from '@/typings/learn/server-side-rendering'
import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'

// 服务端渲染好的html返回,在请求时获取数据并预先渲染页面
const ServerSideRendering: NextPage<Prop> = (props) => {
  const { products } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>服务端渲染</title>
        <meta name="description" content="服务端渲染" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>服务端渲染数据</h1>
      <div>{products}</div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // eslint-disable-next-line no-unused-vars
  const { req, res, query } = context

  const { category } = query
  const products = await getProductsByCategory(category || '')

  return { props: { products } }
}

export default ServerSideRendering
