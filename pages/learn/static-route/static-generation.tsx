import styles from '@/styles/Home.module.scss'
import type { Prop } from '@/typings/learn/static-generation'
import axios from 'axios'
import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'

// 静态页面，数据是死的,构建时进行渲染,简称SSG
const StaticGeneration: NextPage<Prop> = (props) => {
  const { data, str } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>静态生成</title>
        <meta name="description" content="静态生成" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{data.show}</div>

      <div>{str}</div>
    </div>
  )
}

// 将 getStaticProps 这个函数 export 出来，不在客户端上运行,编译时可以从服务器拿死的数据进行页面生成
export async function getStaticProps(context: GetStaticPropsContext) {
  // eslint-disable-next-line
  const { locales, locale, defaultLocale } = context

  try {
    const data = { show: '静态生成的数据' }
    const res = await axios.get('http://www.baidu.com')
    const str = res.data

    return {
      props: {
        data,
        str,
      },
      // 开启后Next.js 将在新的请求进来时尝试重新生成页面，最多10秒1次
      // 增量静态生成，在原有基础上增量生成
      revalidate: 10,
    }
  } catch (error) {
    // 返回404页面
    return { notFound: true }
  }
}

export default StaticGeneration
