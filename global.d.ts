import auth from "next-auth"
import intl from "next-intl"

declare module "next-intl" {
  type Messages = typeof import("./locales/zh.json")
  declare interface IntlMessages extends Messages {}
}

declare namespace NodeJS {
  interface ProcessEnv {
    // 基础路径
    NEXT_PUBLIC_BASEURL: string

    AUTH_SECRET: string

    AUTH_GITHUB_ID: string
    AUTH_GITHUB_SECRET: string

    AUTH_GOOGLE_ID: string
    AUTH_GOOGLE_SECRET: string
  }
}

declare module "next-auth" {
  interface User {
    role?: string
  }
}
