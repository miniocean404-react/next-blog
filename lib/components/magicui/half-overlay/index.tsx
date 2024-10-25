import clsx from "clsx"
import type { PropsWithChildren } from "react"

export default function HalfOverlay({ children }: Readonly<PropsWithChildren<any>>) {
  return (
    <div className="relative w-max">
      {children}
      <div className={clsx("pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background")}></div>
      <div className={clsx("pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background")}></div>
    </div>
  )
}
