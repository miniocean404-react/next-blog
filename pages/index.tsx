// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from '@/css/index.module.scss'
import Page from '@/pages/learn/api-use/layout'
import type { NextPage } from 'next'
import getConfig from 'next/config'
import { useEffect } from 'react'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Home: NextPage = () => {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {}

  return (
    <div className={styles.container}>
      <Page />
    </div>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const res = await download('https://dh5.cntv.kcdnvip.com/asp/h5e/hls/1200/0303000a/3/default/1245817e352a48dbbe1a9ab65359de16/1200.m3u8')
//   console.log(res)

//   return {
//     props: {
//       stationsList: [],
//     },
//   }
// }

export default Home
