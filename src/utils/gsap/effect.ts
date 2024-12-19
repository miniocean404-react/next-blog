import { gsap } from "gsap"

gsap.registerEffect({
  name: "fade",
  // 让结果立即插入到定义的位置(默认是在最后的位置)
  extendTimeline: true,
  // effect 第二个参数默认值
  defaults: {},
  effect: (targets: gsap.TweenTarget) => {
    return gsap.to(targets, {
      opacity: 0,
      duration: 1,
    })
  },
})
