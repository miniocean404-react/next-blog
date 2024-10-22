"use client"
import { Application, Assets, Sprite, Graphics, Rectangle, BlurFilter, Text, TextStyle, Container, type FillInput } from "pixi.js"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function PixiScreen() {
  const canvas = useRef(null)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    // Inner radius of the circle
    const radius = 100

    const app = new Application()
    await app.init({
      resizeTo: canvas.current!, // 自动调整舞台大小的元素。
      canvas: canvas.current!, // 使用自己的 canvas 元素
      width: 800, // 渲染器视图的宽度。
      height: 300, // 渲染器视图的高度。
      autoStart: true, // 构建完成后自动开始渲染。
      autoDensity: true, // 以 CSS 像素调整渲染器视图的大小以允许 1 以外的分辨率。
      antialias: true, // 消除锯齿
      preserveDrawingBuffer: false, // 启用绘图缓冲区保留，如果您需要在 WebGL 上下文中调用 toDataUrl，请启用此功能。
      resolution: window.devicePixelRatio, // settings.RESOLUTION, // 渲染器的分辨率/设备像素比。(视网膜)
      backgroundColor: 0xf6f6f6, // 渲染区域的背景颜色
      backgroundAlpha: 0, // 值从 0（完全透明）到 1（完全不透明）。
      clearBeforeRender: true, // 置渲染器是否在新的渲染通道之前清除画布。
      powerPreference: "high-performance", // 传递给 webgl 上下文的参数，对于具有双显卡的设备，设置为“高性能”。（仅限 WebGL）。
      sharedTicker: false, // true使用 PIXI.Ticker.shared，false创建新的Ticker代码。如果设置为 false，则您不能注册一个处理程序以在共享代码上运行的任何内容之前发生。系统代码将始终在共享代码和应用代码之前运行。
    })
    app.stage.eventMode = "static"
    app.stage.hitArea = app.screen

    document.body.appendChild(app.canvas)

    const chinese = createText({ text: "我的博客", width: app.screen.width, height: app.screen.height, background: { alpha: 1, color: 0xffffff } })
    const en = createText({ text: "MY BLOG", width: app.screen.width, height: app.screen.height, background: { alpha: 1, color: 0xf6f6f6 } })
    en.zIndex = 1
    chinese.zIndex = 0

    const circle = new Graphics().circle(radius, radius, radius).fill({ color: 0xff0000 })
    const bounds = new Rectangle(0, 0, radius * 2, radius * 2)
    const texture = app.renderer.generateTexture({
      target: circle,
      resolution: 1,
      frame: bounds,
    })
    const focus = new Sprite(texture)

    app.stage.addChild(focus)
    app.stage.addChild(chinese)
    app.stage.addChild(en)
    en.mask = focus

    app.stage.on("pointermove", (event) => {
      focus.position.x = event.global.x - focus.width / 2
      focus.position.y = event.global.y - focus.height / 2
    })

    app.stage.on("pointertap", (event) => {
      // gsap.to(focus, {
      //   width: focus.width * 10,
      //   height: focus.height * 10,
      //   duration: 1,
      //   ease: "power1.inOut",
      //   onComplete() {
      //     // if (en.zIndex === 1) {
      //     //   en.zIndex = 0
      //     //   chinese.zIndex = 1
      //     //   en.mask = null
      //     //   chinese.mask = focus
      //     // } else {
      //     //   en.zIndex = 1
      //     //   chinese.zIndex = 0
      //     //   en.mask = focus
      //     //   chinese.mask = null
      //     // }
      //   },
      // })
    })
  }

  const createText = ({ text, width, height, background }: { text: string; width: number; height: number; background: FillInput }) => {
    const rect = new Graphics().rect(0, 0, width, height).fill(background)
    const textture = new Text({
      text,
      style: new TextStyle({
        fontSize: 128,
        fontFamily: "MiSans VF",
        fill: "0x000000",
        fontWeight: "500",
        dropShadow: false,
        align: "center",
        // stroke: '#004620',
        // strokeThickness: 12,
      }),
    })

    textture.anchor.set(0.5)
    textture.position.set(width / 2, height / 2)
    rect.addChild(textture)

    return rect
  }

  return <canvas width={800} height={300} ref={canvas} style={{ borderRadius: 8 }}></canvas>
}
