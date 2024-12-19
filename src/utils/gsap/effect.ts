import { gsap } from "gsap"

// 动态添加类名
// 方式 1: gsap.to(xx,{className:''}) 虽然在 3.0 被废弃，但是还是可以使用，只是只能删除所有 class 添加以下内容
// 方式 2: 使用 gsap.timeline().call(toggleClass, ["#desc", "text-red-600"], ">") 中的 call 回调函数
// 方式 3: 使用 gsap.to 中的 onComplete 钩子, 并且使用 function(){} (而不是箭头函数) 中的 this.targets() 获取目标元素
// 方式 4: 使用 gsap.set(xx,{className:''}) 与方式一一致
gsap.registerEffect({
  name: "className",
  // 让结果立即插入到定义的位置(默认是在最后的位置)
  extendTimeline: true,
  // effect 第二个参数默认值
  defaults: {},
  effect(targets: gsap.TweenTarget, config: { class: string; position: string }) {
    return gsap.timeline().to(
      targets,
      {
        duration: 0.01,
        onComplete() {
          this.targets().forEach((elem: Element) => elem.classList.add(config.class))
        },
        onReverseComplete() {
          this.targets().forEach((elem: Element) => elem.classList.remove(config.class))
        },
      },
      config.position,
    )
  },
})
