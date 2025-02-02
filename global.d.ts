declare global {
  declare module "react" {
    // 为 React style 添加 CSS 变量支持
    interface CSSProperties {
      [key: `--${string}`]: string | number
    }
  }

  declare module "next-auth" {
    interface User {
      role?: string | null
    }
  }
}

type Messages = typeof import("./locales/zh.json")
declare interface IntlMessages extends Messages {}

declare namespace NodeJS {
  declare interface ProcessEnv {
    // APP 基础 URL
    NEXT_PUBLIC_APP_URL: string

    // 基础路径
    NEXT_PUBLIC_BASEURL: string

    // Next runtime 环境
    NEXT_RUNTIME: string | "nodejs" | ""

    // Next Auth 秘钥
    NEXT_PUBLIC_AUTH_SECRET: string

    // ALIGO 秘钥
    NEXT_PUBLIC_ALIGO_APPID: string
    NEXT_PUBLIC_ALIGO_APIKEY: string

    // Github OAuth
    AUTH_GITHUB_ID: string
    AUTH_GITHUB_SECRET: string

    // Google OAuth
    AUTH_GOOGLE_ID: string
    AUTH_GOOGLE_SECRET: string

    // 豆包 AI
    DOUBAO_API_KEY: string

    // Image Kit
    IMAGE_KIT_PUBLIC_KEY: string
    IMAGE_KIT_PRIVATE_KEY: string
    IMAGE_KIT_URL_ENDPOINT: string

    // 数据库
    MYSQL_HOST: string
    MYSQL_POST: number
    MYSQL_USER: string
    MYSQL_PASSWORD: string
    MYSQL_DATABASE: string
  }
}

function fade(target: TweenTarget): core.Tween

declare namespace gsap {
  interface EffectsMap {
    fade: typeof fade
  }
}

declare namespace gsap.core {
  interface Timeline {
    fade: typeof fade
  }
}
