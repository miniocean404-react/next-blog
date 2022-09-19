// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from './index.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { Prop } from '@/typings/script12306'
import fs, { readFileSync } from 'fs'
import path from 'path'
import Image from 'next/image'
import getConfig from 'next/config'
import { readNextFileSync } from '@/utils/file'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Script12306Home: NextPage<Prop> = ({ stationsList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>标题</title>
        <meta name="description" content="描述" />
        <link rel="icon" href={`${publicRuntimeConfig.staticFolder}/favicon.ico`} />
      </Head>

      <div>
        {Array.isArray(stationsList) &&
          stationsList?.map((item: any) => {
            console.log(item)
            return <div>{JSON.stringify(item)}</div>
          })}
      </div>
      <Image
        src={`${publicRuntimeConfig.staticFolder}/image/Mac壁纸.jpg`}
        alt={''}
        width={50}
        height={50}
      />
    </div>
  )
}

// 使用 /learn/dynamic-route/server/xbox
// 值: server / 后边的值,
// 参数: 文件名[category]中的category
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, query } = context

  const file = readNextFileSync('public/12306/stations.txt')
  let stationsList: string[] | object[] = file.split('@')

  stationsList = stationsList.map((item: string) => {
    const temp = item.split('|')
    return {
      key: temp[2],
      name: temp[1],
      pinyin: temp[3],
      id: temp[5],
    }
  })

  return { props: { stationsList } }
}

export default Script12306Home
