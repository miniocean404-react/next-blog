import auth from "next-auth"

declare global {
  declare namespace NodeJS {
    declare interface ProcessEnv {
      // 基础路径
      NEXT_PUBLIC_BASEURL: string

      AUTH_SECRET: string

      AUTH_GITHUB_ID: string
      AUTH_GITHUB_SECRET: string

      AUTH_GOOGLE_ID: string
      AUTH_GOOGLE_SECRET: string

      DOUBAO_API_KEY: string
    }
  }
}

type Messages = typeof import("./locales/zh.json")
declare interface IntlMessages extends Messages {}

declare module "next-auth" {
  interface User {
    role?: string
  }
}
