import styles from '@/styles/Home.module.scss'
import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'

const DynamicRoute: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>标题</title>
      <meta name="description" content="描述" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div>动态路由A</div>
  </div>
)

// fallback = false 则任何未返回的路径getStaticPaths都将导致404 页面,如果有新的路径则需要重新build
// fallback = true 不会生成404页面，第一次访问时会看到骨架界面，后边其他人再请求就返回相同的，保障了构建速度
// fallback = 'blocking' 没有新路径,等待getStaticPaths生成html并返回，类似SSR
export async function getStaticPaths() {
  return {
    paths: [
      // String var:
      // '/learn/dynamic-route/static/a',
      // Object var:
      { params: { static: 'b' } },
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
