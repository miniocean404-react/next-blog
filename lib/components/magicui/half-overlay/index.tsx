import clsx from "clsx"
import type { PropsWithChildren } from "react"

export default function HalfOverlay({ children }: Readonly<PropsWithChildren<any>>) {
  return (
    <div className="relative w-max">
      {children}
      <div
        className={clsx(
          "dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white",
        )}
      ></div>
      <div
        className={clsx(
          "dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white",
        )}
      ></div>
    </div>
  )
}
