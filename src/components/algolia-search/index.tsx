"use client"

import { useMounted } from "@/utils/hook/mounted"
import { cn } from "@/utils/tw"
import docsearch from "@docsearch/js"
import { Search as SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, type PropsWithChildren } from "react"

import "@docsearch/css"
import "./index.css"

export default function AlgoliaSearch({ children }: PropsWithChildren<any>) {
  const t = useTranslations("header")
  const isMonted = useMounted()

  const translations = t.raw<any>("search")

  // useHotkeys(["meta+k", "ctrl+k"], openSearch, [], { preventDefault: true })

  useEffect(() => {
    docsearch({
      container: "#docsearch",
      appId: process.env.NEXT_PUBLIC_ALIGO_APPID,
      apiKey: process.env.NEXT_PUBLIC_ALIGO_APIKEY,
      indexName: "miniocean404s",
      // todo 未知类型问题
      // searchParameters: {
      // facetFilters: [`language:${locale}`, "version:1.0.0"],
      // facetFilters: [""],
      // },
      insights: true,
      // 第一次查询参数
      initialQuery: "",
      placeholder: t("search.placeholder"),
      translations,
    })
  }, [])

  return (
    // <link rel="preconnect" href="https://YOUR_APP_ID-dsn.algolia.net" crossorigin />
    <div id="docsearch" className={cn({ hidden: !isMonted })}>
      <button
        type="button"
        className="DocSearch DocSearch-Button"
        aria-label={translations.button?.buttonAriaLabel}
      >
        <span className="DocSearch-Button-Container">
          <SearchIcon className={"DocSearch-Search-Icon"}></SearchIcon>
          <span className={"DocSearch-Button-Placeholder"}>{t("search.button.buttonText")}</span>
        </span>

        <span className="DocSearch-Button-Keys">
          <kbd className="DocSearch-Button-Keys"></kbd>
          <kbd className="DocSearch-Button-Keys">K</kbd>
        </span>
      </button>
    </div>
  )
}
