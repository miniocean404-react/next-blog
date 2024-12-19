"use client"

import { cn } from "@/utils/tw"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { toggleClass, MM_SM } from "@/utils/gsap"
import { useRef } from "react"

// background: linear-gradient(180deg, rgb(255, 255, 255), rgb(242, 208, 230));
// background-image: linear-gradient(180deg, rgb(12, 18, 71), rgb(40, 51, 125) 28%, rgb(80, 93, 173) 46%, rgb(125, 142, 209) 60%, rgb(174, 188, 230) 75%, rgb(239, 236, 255) 90%, rgb(255, 255, 255));
// 100:79

export default function MiniToolScroll() {
  const containerRef = useRef<HTMLSelectElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // timeline 可以 .add() 另一个 timeline
      const t1 = gsap.timeline({
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
          start: "top top+=64",
          // bottom bottom 代表目标元素 底部与 触发器元素 底部对齐时候结束
          end: "bottom top+=64",
        },
      })

      mm.add(MM_SM, () => {
        t1.addLabel("#mini-tool-plugin-label")
          .to(
            "#mini-tool-plugin",
            {
              ease: "power1.out",
              scale: 0.8,
              x: 300,
            },
            "#mini-tool-plugin-label",
          )
          .to(
            "#desc",
            {
              x: -450,
            },
            "#mini-tool-plugin-label",
          )
          .className("#desc", { class: "text-red-600", position: ">" })
      })
    },
    { dependencies: [] },
  )

  return (
    <div
      id="scrollBox"
      className="flex h-mini-layout-one-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[rgb(255,255,255)] from-0% via-[rgb(242,208,230)] via-50% to-[rgb(255,255,255)] to-100%"
    >
      <div id="desc">
        <h2 className="text-3xl">中文</h2>
        <h3 className="mt-20 text-5xl">中文格式化</h3>
        <p className="mt-10 text-2xl">优雅的阅读</p>
      </div>

      <Image
        id="mini-tool-plugin"
        className="absolute z-0 h-auto w-[1200px]"
        src={"/image/mini-tool-plugin.png"}
        width={1200}
        height={800}
        alt={"mini-tool-plugin"}
        priority
      />
    </div>
  )
}
