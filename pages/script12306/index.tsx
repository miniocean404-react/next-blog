// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import type { NextPage } from 'next'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { Prop } from '@/typings/script12306'
import getConfig from 'next/config'
import { useEffect, useState } from 'react'
import { getStations } from '@/http/client/example-use'
import styles from './index.module.scss'

// eslint-disable-next-line
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Script12306Home: NextPage<Prop> = ({ stationsList }) => {
  const [stations, setStations] = useState<object[]>([])

  useEffect(() => {
    getStations().then(([_, res]: any) => {
      setStations(res.data.data)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>12306</title>
      </Head>

      <div>
        {stations?.map((item: any) => (
          <div>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  )
}

// 使用 /learn/dynamic-route/server/xbox
// 值: server / 后边的值,
// 参数: 文件名[category]中的category
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // eslint-disable-next-line
  const { req, res, query } = context

  return { props: { stationsList: [] } }
}

export default Script12306Home
