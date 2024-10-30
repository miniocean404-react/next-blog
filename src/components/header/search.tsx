import { cn } from "@/utils/tw"
import { Search as SearchIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, type PropsWithChildren } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { zhTranslations } from "@/constant/docsearch"
import "@docsearch/css"
import "./index.css"
import docsearch from "@docsearch/js"

export default function Search({ children }: PropsWithChildren<any>) {
  const t = useTranslations("")
  const locale = useLocale()

  // useHotkeys(["meta+k", "ctrl+k"], openSearch, [], { preventDefault: true })

  useEffect(() => {
    docsearch({
      container: "#docsearch",
      appId: "R2IYF7ETH7",
      apiKey: "599cec31baffa4868cae4e79f180729b",
      indexName: "docsearch",
      searchParameters: {
        facetFilters: [`language:${locale}`, "version:1.0.0"],
      },
      insights: true,
      initialQuery: "第一次查询参数",
      translations: zhTranslations,
    })
  }, [])

  function openSearch() {}

  return (
    <>
      <div id="docsearch">
        <button
          type="button"
          className="DocSearch DocSearch-Button"
          onClick={openSearch}
          aria-label={zhTranslations.button?.buttonAriaLabel}
        >
          <span className="DocSearch-Button-Container">
            <SearchIcon className={"DocSearch-Search-Icon"}></SearchIcon>
            <span className={"DocSearch-Button-Placeholder"}>{t("home.search")}</span>
          </span>

          <span className="DocSearch-Button-Keys">
            <kbd className="DocSearch-Button-Keys"></kbd>
            <kbd className="DocSearch-Button-Keys">K</kbd>
          </span>
        </button>
      </div>

      {/* <link rel="preconnect" href="https://YOUR_APP_ID-dsn.algolia.net" crossorigin /> */}
    </>
  )
}
