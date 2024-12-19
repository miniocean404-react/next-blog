import ScrollTrigger from "gsap/ScrollTrigger"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

gsap.config({})

ScrollTrigger.defaults({
  // 滚动触发 class 的切换行为
  toggleActions: "restart pause resume pause",
  // scroller: ".container", // 滚动根容器
  // 滚动调试模式
  markers: false,
})
