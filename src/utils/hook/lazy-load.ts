import { useEffect } from "react"

export const useLazyLoad = (ref: React.RefObject<HTMLElement>, rootMargin = 200) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const dataset = (entry.target as HTMLElement).dataset
            switch (true) {
              case element instanceof HTMLImageElement:
                element.src = dataset.src || ""
                break
              case element instanceof HTMLVideoElement:
                element.src = dataset.src || ""
                element.poster = dataset.poster || ""
                break
              default:
                if (dataset.background) element.style.background = dataset.background || ""
                if (dataset.backgroundImage)
                  element.style.backgroundImage = dataset.backgroundImage || ""
                break
            }
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: `${rootMargin}px`,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])
}
