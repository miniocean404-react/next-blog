import styles from '@/styles/Home.module.scss'
import type { Prop } from '@/typings/learn/static-generation'
import type { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const DynamicRoute: NextPage<Prop> = (props) => {
  const { staticParams } = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const click = () => {
    // @ts-ignore
    console.log(structuredClone(1))
  }

  return (
    // eslint-disable-next-line
    <div className={styles.container} onClick={click}>
      <Head>
        <title>标题</title>
        <meta name="description" content="描述" />
      </Head>

      <div>静态生成{staticParams}</div>
    </div>
  )
}

// ithelp.ithome.com.tw/articles/10269586
// fallback = false 不在path中的路径都会导致404 页面,如果有新的路径则需要重新build
// fallback = true 不会生成404页面，如果访问没有在path中的目录将 fallback 的頁面給使用者，
// 在服务器生成之前。使用者会看到fallback页面 getStaticProps 执行完后 以prop注入到页面中，使用者這時就能看到完整的頁面。
// 流程结束后页面会进入到 pre-rendering 中后边其他人再请求不会再执行getServerSideProps，而是产生新的页面给使用者
// 这样保障了构建速度
// fallback = 'blocking' 情况类似为true的样子，不同的是没有router.isFallback使用，而是让页面卡在getStaticProps状态，体验感类似SSR，第二次访问也是返回缓存的html
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    // 字符串生成
    // '/learn/dynamic-route/static/a',

    // 对象变量 针对哪些属性生成静态文档,true,false都是生成这些
    { params: { staticParams: '1' } },
  ],
  fallback: false,
})

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const { params } = context
  const { staticParams } = params
  // eslint-disable-next-line

  return {
    props: { staticParams },
  }
}

export default DynamicRoute
