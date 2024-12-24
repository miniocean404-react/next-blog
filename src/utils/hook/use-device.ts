import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768 // md
const TABLET_BREAKPOINT = 1024 // lg
const DESKTOP_BREAKPOINT = 1024

const CHECK_MIN_GAP = 0.02

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>()
  const [isTable, setIsTable] = useState<boolean>()
  const [isDesktop, setIsDesktop] = useState<boolean>()

  useEffect(() => {
    const matchs = [
      {
        media: `(max-width: ${MOBILE_BREAKPOINT - CHECK_MIN_GAP}px)`,
        state: setIsMobile,
      },
      {
        media: `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - CHECK_MIN_GAP}px)`,
        state: setIsTable,
      },
      {
        media: `(min-width: ${DESKTOP_BREAKPOINT}px)`,
        state: setIsDesktop,
      },
    ]

    const destroys = matchs.map(({ media, state }) => {
      const mql = window.matchMedia(media)
      const onChange = () => state(mql.matches)

      onChange()
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    })

    return () => destroys.forEach((destroy) => destroy())
  }, [])

  return [!!isMobile, !!isTable, !!isDesktop]
}
