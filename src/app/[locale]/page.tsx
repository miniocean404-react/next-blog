"use client"

import PixiScreen from "@/components/pixi-screen"
import { startConfetti } from "@/utils/confetti"
import { useEffect, useRef } from "react"
import styles from "./index.module.scss"
import Typed from "typed.js"
import Particles from "~/lib/components/particles"
import Marquee from "~/lib/components/marquee"
import HalfOverlay from "~/lib/components/half-overlay"
import HeroVideoDialog from "~/lib/components/hero-video-dialog"

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
]

export default function Home(props: { params: { locale: string } }) {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<span>Miniocean404 的博客</span> .", "一个前端开发的博客"],
      typeSpeed: 50,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 ref={el}></h1>
      </div>

      {/* <p>用艺术家的视角审视，以工匠精神创造开发</p> */}
      {/* <PixiScreen></PixiScreen> */}
      <Particles className={styles.particles} quantity={100} ease={80} color={"#000000"} refresh></Particles>

      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  )
}
