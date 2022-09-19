// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import type { NextPage } from 'next'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { Prop } from '@/typings/script12306'
import Image from 'next/image'
import getConfig from 'next/config'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'

// eslint-disable-next-line
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Script12306Home: NextPage<Prop> = ({ stationsList }) => {
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetch('/next/api/script12306').then(async (res) => {
      const data = await res.json()
      setStations(data.data)
    })
  }, [])

  console.log(stations)

  return (
    <div className={styles.container}>
      <Head>
        <title>12306</title>
      </Head>

      <div>
        {stations?.map((item: any) => {
          return <div>{JSON.stringify(item)}</div>
        })}
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
