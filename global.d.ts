declare global {
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
    // 基础路径
    NEXT_PUBLIC_BASEURL: string

    // Next runtime 环境
    NEXT_RUNTIME: string | "nodejs"

    AUTH_SECRET: string

    AUTH_GITHUB_ID: string
    AUTH_GITHUB_SECRET: string

    AUTH_GOOGLE_ID: string
    AUTH_GOOGLE_SECRET: string

    DOUBAO_API_KEY: string

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
