import Link from "next/link"
import styles from "./index.module.scss"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "平行路由",
}

export default async function Home(props: { locale: string }) {
  return (
    <div className={styles.container}>
      <Link href={"/zh-CN/learn/ParallelRoute"}>首页</Link>
      {/* link 是软导航，当 link 到平行路由时会复用 demo2，然后导航到 demo3  */}
      {/* 刷新是硬导航，当硬导航时候，会寻找 ParallelRoute 下的 demo3、demo1 下的 demo3、demo2 下的 demo3、当有一个是 404 页面就会 404*/}
      {/* 解决：1. 在上述页面中都添加 demo3，但是有很多重复  2.在上述中除了 demo1 之外的目录中添加 default.ts,设置默认文件*/}
      <Link href={"/zh-CN/learn/ParallelRoute/demo3"}>demo3</Link>
    </div>
  )
}
