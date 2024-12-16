"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRef } from "react"

export default function Scroll() {
  const t = useTranslations()
  // const ref = useRef<HTMLDivElement>(null)
  // const { scrollY, scrollYProgress } = useScroll({ target: ref })

  // useMotionValueEvent(scrollY, "change", (latest) => {})

  // const scaleX = useSpring(scrollY)

  return (
    <motion.div style={{ height: "200vh" }}>
      {/* <span>{t("home.slogan.first")}</span>,<span>{t("home.slogan.second")}</span> */}
      {/* <SiReact color="#61DAFB" size={300} strokeDasharray={0} strokeDashoffset={0}></SiReact> */}
    </motion.div>
  )
}
