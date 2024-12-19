"use client"

import { cn } from "@/utils/tw"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import "@/utils/gsap"
import { MM_SM } from "@/constant/media"

// background: linear-gradient(180deg, rgb(255, 255, 255), rgb(242, 208, 230));
// background-image: linear-gradient(180deg, rgb(12, 18, 71), rgb(40, 51, 125) 28%, rgb(80, 93, 173) 46%, rgb(125, 142, 209) 60%, rgb(174, 188, 230) 75%, rgb(239, 236, 255) 90%, rgb(255, 255, 255));

export default function Scroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    const t1 = gsap.timeline()

    mm.add(MM_SM, () => {
      t1.to("#mini-tool-plugin", {
        scale: 0.8,
        borderRadius: 10,
        duration: 3000,
        scrollTrigger: {
          // 触发滚动的容器
          trigger: "#scrollBox",
          // 辅助查看
          // markers: true,
          // 在执行时固定触发器元素
          pin: true,
          // 固定时候的滚动的类型
          pinType: "fixed",
          // top top 代表目标元素 顶部与 触发器元素 顶部对齐时候开始
          start: "top top",
          // bottom bottom 代表目标元素 底部与 触发器元素 底部对齐时候结束
          end: "bottom top",
          // 平滑拖动，数字表示 xx 秒才能“赶上”滚动条，boolean 表示动画可以重复执行改成 false 表示只执行一次
          scrub: true,
          // 如果为 true，则如果你以超过特定速度（默认 2500px/s）的速度离开当前 ScrollTrigger 的触发区域，它将强制当前 ScrollTrigger 的动画完成
          fastScrollEnd: 2500,
        },
      })
    })
  }, [])

  // 3600 2844/100:79
  return (
    <div
      id="scrollBox"
      className="flex h-mini-layout-one-screen w-full items-center justify-center bg-gradient-to-b from-[rgb(255,255,255)] from-0% via-[rgb(242,208,230)] via-50% to-[rgb(255,255,255)] to-100%"
    >
      <div className={cn("image overflow-hidden")}>
        <Image
          id="mini-tool-plugin"
          className="h-auto w-[1200px]"
          src={"/image/mini-tool-plugin.jpg"}
          width={1200}
          height={800}
          alt={"mini-tool-plugin"}
          priority
        />
      </div>
    </div>
  )
}
