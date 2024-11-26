"use client"
import { useRef } from "react"
import { useEvent } from "react-use"

export default function DynWebTitle(props: { title: string }) {
  const interval = useRef<NodeJS.Timeout>()

  useEvent("visibilitychange", () => {
    const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]')!

    let start = 0

    if (document.visibilityState === "visible") {
      document.title = props.title
      faviconLink.href = "/favicon.ico"
      clearInterval(interval.current)
    } else if (document.visibilityState === "hidden") {
      document.title = `🚫 哎呀, 你怎么走了呀 ...`

      const canvas = document.createElement("canvas")
      canvas.width = 32
      canvas.height = 32

      draw(faviconLink, canvas, start++)
      interval.current = setInterval(() => draw(faviconLink, canvas, start++), 1000)
    }
  })

  const draw = (link: HTMLLinkElement, canvas: HTMLCanvasElement, text: number) => {
    if (text > 99) return clearInterval(interval.current)

    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 12, 0, 2 * Math.PI)
    ctx.fill()

    // canvas 文字居中：https://juejin.cn/post/6948779766384164901
    ctx.font = "16px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const fix = ctx.measureText(text.toString()).actualBoundingBoxDescent / 2
    ctx.fillText(text.toString(), canvas.width / 2, canvas.height / 2 + fix / 2)

    // 将 canvas 转换为数据 canvas.height / 2
    const dataURL = canvas.toDataURL()

    // 设置为 favicon
    link.href = dataURL
  }
  return null
}
