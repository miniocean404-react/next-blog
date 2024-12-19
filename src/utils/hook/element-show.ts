import { useEffect } from "react"

interface I_Param {
  isAllEntries?: boolean
  observerOptions?: IntersectionObserverInit
  dependencies?: React.DependencyList
  getElementsFunc?: () => Element[] | null
  callback: (entries: IntersectionObserverEntry[]) => void
}

// 元素是否在视口的 hook
export const useListenElementsShow = (params: I_Param) => {
  const { isAllEntries, observerOptions, dependencies = [], getElementsFunc, callback } = params

  useEffect(() => {
    const elements = getElementsFunc && getElementsFunc()
    const observer = new IntersectionObserver((entries) => {
      if (isAllEntries) callback(entries)
      else {
        const entriesInInterSecting = entries.filter((entry) => entry.isIntersecting)
        if (entriesInInterSecting && entriesInInterSecting.length) {
          callback(entriesInInterSecting)
        }
      }
    }, observerOptions)

    elements && elements?.forEach((element) => element && observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, dependencies)
}
