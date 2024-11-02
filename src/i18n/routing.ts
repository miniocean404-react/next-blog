import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // always: 总是添加路由前缀
  // as-needed: 默认语言不添加路由前缀，其他语言添加
  // never: 根据 set-cookie 设置的语言添加路由前缀，或根据 domain 设置的语言添加路由前缀
  localePrefix: "as-needed",
  defaultLocale: "zh",
  locales: ["zh", "en"],
  localeCookie: {
    // 自定义语言环境 cookie 名称
    name: "USER_LOCALE",
    // 自定义过期时间
    maxAge: 60 * 60 * 24,
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
