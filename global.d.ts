type Messages = typeof import("./locales/zh.json")
declare interface IntlMessages extends Messages {}

declare namespace NodeJS {
  interface ProcessEnv {
    // 基础路径
    NEXT_PUBLIC_BASEURL: string
  }
}
