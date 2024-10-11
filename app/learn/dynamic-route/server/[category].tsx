import { getProductsByCategory } from '@/app/api/products/[category]'
import styles from '@/styles/Home.module.scss'
import type { Prop } from '@/typings/learn/server-side-rendering'
import type { GetServerSidePropsContext, NextPage } from 'next'
import getConfig from 'next/config'
import Head from 'next/head'
import Image from 'next/image'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

// 服务端渲染好的html返回,在请求时获取数据并预先渲染页面
const ServerSideRendering: NextPage<Prop> = (props) => {
  const { products } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>服务端渲染</title>
        <meta name="description" content="服务端渲染" />
      </Head>

      <h1>服务端渲染图片数据</h1>
      <div>
        {products.map((item: any) => {
          return <Image src={item.image} width={50} height={50}></Image>
        })}
      </div>
    </div>
  )
}

// 使用 /learn/dynamic-route/server/xbox
// 值: server / 后边的值,
// 参数: 文件名[category]中的category
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, query } = context
  const { category } = query

  const type = query.category

  const products = await getProductsByCategory(type || '')

  return { props: { products } }
}

export default ServerSideRendering
