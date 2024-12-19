import ScrollTrigger from "gsap/ScrollTrigger"
import gsap from "gsap"

// 动态添加类名
// 方式 1: gsap.to(xx,{className:''}) 虽然在 3.0 被废弃，但是还是可以使用，只是只能删除所有 class 添加以下内容
// 方式 2: 使用 gsap.timeline().call(toggleClass, ["#desc", "text-red-600"], ">") 中的 call 回调函数
// 方式 3: 使用 gsap.to 中的 onComplete 钩子, 并且使用 function(){} (而不是箭头函数) 中的 this.targets() 获取目标元素

gsap.registerPlugin(ScrollTrigger)

gsap.config({})

ScrollTrigger.defaults({
  // 滚动触发 class 的切换行为
  toggleActions: "restart pause resume pause",
  // scroller: ".container", // 滚动根容器
  // 滚动调试模式
  markers: false,
  // 平滑拖动，数字表示 xx 秒才能“赶上”滚动条，boolean 表示动画可以重复执行改成 false 表示只执行一次
  scrub: true,
  // 如果为 true，则如果你以超过特定速度（默认 2500px/s）的速度离开当前 ScrollTrigger 的触发区域，它将强制当前 ScrollTrigger 的动画完成
  fastScrollEnd: 2500,
  // 将在底部（horizontal: true 时为右侧）添加填充以将其他元素向下推，这样当固定元素取消固定时，以下内容就可以完美跟上。否则，内容可能会滚动到固定元素下方
  pinSpacing: true,
})
