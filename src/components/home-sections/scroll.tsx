"use client"

import { cn } from "@/utils/tw"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRef, useState } from "react"

// background: linear-gradient(180deg, rgb(255, 255, 255), rgb(242, 208, 230));
// background-image: linear-gradient(180deg, rgb(12, 18, 71), rgb(40, 51, 125) 28%, rgb(80, 93, 173) 46%, rgb(125, 142, 209) 60%, rgb(174, 188, 230) 75%, rgb(239, 236, 255) 90%, rgb(255, 255, 255));

export default function Scroll() {
  const t = useTranslations()
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({
    target: targetRef,
    axis: "y",
    // ["目标元素,滚动容器","目标元素,滚动容器"]
    // demo: ["start start", "end start"]
    // 目标元素的的开始位置 与 滚动容器的开始位置交叉时候开始，目标元素的结束位置 与 滚动容器的开始位置交叉时候结束
    offset: ["start start", "end end"],
  })

  // useMotionValueEvent(scrollY, "change", (latest) => {})
  // const scaleX = useSpring(scrollY)

  const position = useTransform(scrollYProgress, (pos) => {
    if (0 < pos && pos < 1) return "fixed"
    return "relative"
  })

  const y = useTransform(scrollYProgress, (pos) => {
    if (pos === 1) return "100vh"
  })

  // const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(240px 380px)", "inset(0px 0px)"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6])
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "10px"])
  const color = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"])

  // 3600 2844/100:79
  return (
    <section className="relative h-[200vh]" ref={targetRef}>
      <motion.div
        className={cn("relative top-mini-header overflow-hidden will-change-transform")}
        style={{ color, position, y, scale, borderRadius }}
      >
        <Image
          className="w-full"
          src={"/image/mini-tool-plugin.jpg"}
          width={3600}
          height={2844}
          alt={"logo"}
          priority
        />
      </motion.div>
    </section>
  )
}
