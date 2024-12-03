import { MetadataRoute } from "next"

// PWA 配置：https://blog.csdn.net/weixin_39550080/article/details/141126514
export default function manifest(): MetadataRoute.Manifest {
  return {
    // 一个字符串，用于对照可托管在同一源上的其他 PWA 独一无二地标识此 PWA。如果未设置，start_url 将用作后备值。请注意，如果日后更改 start_url（例如，更改查询字符串值时），浏览器可能无法检测已安装 PWA。
    // id 属性有何用途？ id 属性向浏览器表示 PWA 的身份。当浏览器发现一个清单没有与已安装的 PWA 匹配的身份时，它会将其视为新的 PWA，即使它是通过与另一个 PWA 相同的网址提供的。但是，如果它发现其身份与已安装的 PWA 匹配，则会将其视为已安装的 PWA
    // 目前使用的是 Miniocean404 Blog 的 md5 值
    id: "f3d620e6fdb22458d0d6b1b25bc10af1",
    // 您的 PWA 的全名。此图标会与图标一起显示在操作系统的主屏幕、启动器、Dock 或菜单中。
    name: "Miniocean404 Blog",
    // 即您的 PWA 的较短名称，在没有足够的空间来显示 name 字段的全部值时使用
    short_name: "Mini Blog",
    description: "Next.js App",
    // 当用户通过已安装的图标启动 PWA 时，该应用应加载的网址。
    start_url: "/",
    // 用于描述操作系统应如何绘制 PWA 窗口,fullscreen、standalone、minimal-ui 或 browser 之一,大多数用例都实现了 standalone
    display: "standalone",
    // 应用的默认颜色，有时会影响操作系统显示网站的方式（例如，桌面设备上的窗口和标题栏颜色，或移动设备上的状态栏颜色）。此颜色可被 HTML theme-color <meta> 元素替换
    background_color: "#fff",
    // 在应用样式表加载之前要在应用背景中显示的占位符颜色。iOS 和 iPadOS 上的 Safari 以及大多数桌面浏览器目前会忽略此字段
    theme_color: "#fff",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    // 屏幕方向
    orientation: "portrait-primary",
    // 文字方向
    dir: "auto",
    lang: "zh-CN",
  }
}
