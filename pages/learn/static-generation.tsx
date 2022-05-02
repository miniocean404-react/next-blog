import styles from '@/styles/Home.module.scss'
import type { Prop } from '@/typings/learn/static-generation'
import type { NextPage } from 'next'
import Head from 'next/head'
import A from '@/pages/a'

A()
const StaticGeneration: NextPage<Prop> = (props) => {
  const { data } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>静态生成</title>
        <meta name="description" content="静态生成" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{data.show}</div>
    </div>
  )
}

export async function getStaticProps() {
  const data = { show: '静态生成的数据' }

  return {
    props: {
      data,
    },
  }
}

export default StaticGeneration
