// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from './index.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { Prop } from '@/typings/script12306'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import getConfig from 'next/config'
import { WEB_PREFIX } from '@/constant/runtime'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Script12306Home: NextPage<Prop> = ({ products }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>标题</title>
        <meta name="description" content="描述" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {Array.isArray(products) &&
          products?.map((item: any) => {
            return <div>{item}</div>
          })}
      </div>
      <Image src={`${WEB_PREFIX}/image/Mac壁纸.jpg`} alt={''} width={50} height={50} />
    </div>
  )
}

// 使用 /learn/dynamic-route/server/xbox
// 值: server / 后边的值,
// 参数: 文件名[category]中的category
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, query } = context
  const { category } = query

  console.log(serverRuntimeConfig)
  const url = path.join(WEB_PREFIX, 'utf-8', '12306/stations.txt')
  fs.readFile(url, (err, data) => {
    console.log(data)
  })

  const type = query.category

  const products = ['1']
  return { props: { products } }
}

export default Script12306Home
