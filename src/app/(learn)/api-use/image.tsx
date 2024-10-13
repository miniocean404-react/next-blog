// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import styles from "@/css/index.module.scss"
import Mac from "@/public/image/Mac壁纸.jpg"
import type { NextPage } from "next"
import getConfig from "next/config"
import Image from "next/image"

const { publicRuntimeConfig } = getConfig()

const ImageUse: NextPage = () => (
  <div className={styles.container}>
    {/* Image使用 */}
    {/* 远程:远程图片需要手动设置宽高,必须定义images: {domains: ['example.com', 'example2.com']}列表或layout="fill" */}
    {/* 本地:本地图片自动获取图片原始宽高 */}
    {/* 宽高:layout="fill" layout设置图片的宽高 */}
    {/* 优先级:priority可以对要加载的图像进行特别优先排序 */}
    {/* 文档： https://nextjs.org/docs/api-reference/next/image#layout https://nextjs.org/docs/basic-features/image-optimization */}
    <Image src={Mac} alt="Mac壁纸" width={200} height={200} priority />

    <Image src={`${publicRuntimeConfig.staticFolder}/image/Mac.jpg`} alt="" width={50} height={50} />
  </div>
)

export default ImageUse
