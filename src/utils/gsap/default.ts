import ScrollTrigger from "gsap/ScrollTrigger"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

gsap.config({})

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  // scroller: ".container", // 滚动根容器
  markers: false,
})
