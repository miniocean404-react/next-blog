import styles from '@/styles/Home.module.scss'
import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'

const DynamicRoute: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>嵌套路由</title>嵌套路由
      <meta name="description" content="嵌套路由" />
    </Head>

    <div>嵌套生成静态路由</div>
  </div>
)

// fallback = false 则任何未返回的路径getStaticPaths都将导致404 页面,如果有新的路径则需要重新build
// fallback = true 不会生成404页面，第一次访问时会看到骨架界面，后边其他人再请求就返回相同的，保障了构建速度
// fallback = 'blocking' 没有新路径,等待getStaticPaths生成html并返回，类似SSR
export async function getStaticPaths() {
  return {
    paths: [
      // 字符串生成
      // '/learn/dynamic-route/static/a',

      // 对象变量
      { params: { nested: 'nested1', child: 'child1' } },
      { params: { nested: 'nested2', child: 'child2' } },
      { params: { nested: 'nested3', child: 'child3' } },
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
