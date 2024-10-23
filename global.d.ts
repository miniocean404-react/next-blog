type Messages = typeof import("./locales/en.json")
declare interface IntlMessages extends Messages {}

declare namespace NodeJS {
  interface ProcessEnv {
    // 基础路径
    NEXT_PUBLIC_BASEURL: string
  }
}
