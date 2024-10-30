import type { DocSearchTranslations } from "@docsearch/react"

const enTranslations: DocSearchTranslations = {
  button: {
    buttonText: "Search",
    buttonAriaLabel: "Search",
  },
  modal: {
    searchBox: {
      resetButtonTitle: "Clear the query",
      resetButtonAriaLabel: "Clear the query",
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "Cancel",
      searchInputLabel: "Search",
    },
    startScreen: {
      recentSearchesTitle: "Recent",
      noRecentSearchesText: "No recent searches",
      saveRecentSearchButtonTitle: "Save this search",
      removeRecentSearchButtonTitle: "Remove this search from history",
      favoriteSearchesTitle: "Favorite",
      removeFavoriteSearchButtonTitle: "Remove this search from favorites",
    },
    errorScreen: {
      titleText: "Unable to fetch results",
      helpText: "You might want to check your network connection.",
    },
    footer: {
      selectText: "to select",
      selectKeyAriaLabel: "Enter key",
      navigateText: "to navigate",
      navigateUpKeyAriaLabel: "Arrow up",
      navigateDownKeyAriaLabel: "Arrow down",
      closeText: "to close",
      closeKeyAriaLabel: "Escape key",
      searchByText: "Search by",
    },
    noResultsScreen: {
      noResultsText: "No results for",
      suggestedQueryText: "Try searching for",
      reportMissingResultsText: "Believe this query should return results?",
      reportMissingResultsLinkText: "Let us know.",
    },
  },
}

export const zhTranslations: DocSearchTranslations = {
  button: {
    buttonText: "搜索文档",
    buttonAriaLabel: "搜索文档",
  },
  modal: {
    searchBox: {
      resetButtonTitle: "清除查询条件",
      resetButtonAriaLabel: "清除查询条件",
      cancelButtonText: "取消",
      cancelButtonAriaLabel: "取消",
      searchInputLabel: "搜索文档",
    },
    startScreen: {
      recentSearchesTitle: "搜索历史",
      noRecentSearchesText: "没有搜索历史",
      saveRecentSearchButtonTitle: "保存至搜索历史",
      removeRecentSearchButtonTitle: "从搜索历史中移除",
      favoriteSearchesTitle: "收藏",
      removeFavoriteSearchButtonTitle: "从收藏中移除",
    },
    errorScreen: {
      titleText: "无法获取结果",
      helpText: "你可能需要检查你的网络连接",
    },
    footer: {
      selectText: "选择",
      selectKeyAriaLabel: "Enter 键",
      navigateText: "切换",
      navigateUpKeyAriaLabel: "上键",
      navigateDownKeyAriaLabel: "下键",
      closeText: "关闭",
      closeKeyAriaLabel: "Esc 键",
      searchByText: "搜索提供者",
    },
    noResultsScreen: {
      noResultsText: "无法找到相关结果",
      suggestedQueryText: "你可以尝试查询",
      reportMissingResultsText: "你认为该查询应该有结果？",
      reportMissingResultsLinkText: "点击反馈",
    },
  },
}
