import auth from "next-auth"
import {
  useTranslations,
  ReactNode,
  Formats,
  TranslationValues,
  MarkupTranslationValues,
  RichTranslationValues,
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
} from "next-intl"

type Messages = typeof import("./locales/zh.json")
declare interface IntlMessages extends Messages {}

export default function useT<
  NestedKey extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>> = never,
>(
  namespace?: NestedKey,
): {
  <
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          "!": IntlMessages
        },
        [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            "!": IntlMessages
          },
          [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats,
  ): string
  rich<
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          "!": IntlMessages
        },
        [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            "!": IntlMessages
          },
          [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: RichTranslationValues,
    formats?: Formats,
  ): ReactNode
  markup<
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          "!": IntlMessages
        },
        [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            "!": IntlMessages
          },
          [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: MarkupTranslationValues,
    formats?: Formats,
  ): string
  raw<
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          "!": IntlMessages
        },
        [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            "!": IntlMessages
          },
          [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
  ): any
  has<
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          "!": IntlMessages
        },
        [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            "!": IntlMessages
          },
          [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
  ): boolean
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
