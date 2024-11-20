import { PrismaClient } from "@prisma/client"

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

      IMAGE_KIT_PUBLIC_KEY: string
      IMAGE_KIT_PRIVATE_KEY: string
      IMAGE_KIT_URL_ENDPOINT: string
    }
  }

  type Messages = typeof import("./locales/zh.json")
  declare interface IntlMessages extends Messages {}

  var DB: undefined | PrismaClient
}

declare module "next-auth" {
  interface User {
    role?: string
  }
}
