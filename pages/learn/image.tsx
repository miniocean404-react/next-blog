// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import Mac from '@/public/image/Mac壁纸.jpg'
import styles from '@/styles/Home.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const ImageUse: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>图片使用</title>
      <meta name="description" content="描述" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {/* Image使用 */}
    {/* 远程:远程图片需要手动设置宽高,必须定义images: {domains: ['example.com', 'example2.com']}列表 */}
    {/* 本地:本地图片自动获取图片原始宽高 */}
    {/* 宽高:layout="fill" layout设置图片的宽高 */}
    {/* 优先级:priority可以对要加载的图像进行特别优先排序 */}
    {/* 文档： https://nextjs.org/docs/api-reference/next/image#layout https://nextjs.org/docs/basic-features/image-optimization */}
    <Image src={Mac} alt="Mac壁纸" width={200} height={200} priority />
  </div>
)

export default ImageUse
