import { prisma } from "./src/db/index"
type Messages = typeof import("./locales/zh.json")
declare interface IntlMessages extends Messages {}

declare namespace NodeJS {
  interface ProcessEnv {
    // 基础路径
    NEXT_PUBLIC_BASEURL: string
    AUTH_GITHUB_ID: string
    AUTH_GITHUB_SECRET: string
    AUTH_GOOGLE_ID: string
    AUTH_GOOGLE_SECRET: string
  }
}

declare global {
  var DB: undefined | typeof prisma
}
