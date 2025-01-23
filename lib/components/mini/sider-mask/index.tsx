"use client"

import type { PropsWithChildren } from "react"
import { cn } from "~/lib/utils"

interface SiderMaskProps {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}

// mask 左右："[mask-image:linear-gradient(90deg,transparent_0%,#ffffff_30%,#ffffff_70%,transparent_100%)]"
// mask 上下："[mask-image:linear-gradient(0deg,transparent_0%,#ffffff_30%,#ffffff_70%,transparent_100%)]"
export default function SiderMask(props: Readonly<PropsWithChildren<SiderMaskProps>>) {
  const { top, bottom, left, right, children } = props

  return (
    <div className={cn({ relative: children })}>
      {children}

      {left && (
        <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-linear-to-r from-white" />
      )}
      {right && (
        <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-linear-to-l from-white" />
      )}

      {top && (
        <div className="dark:from-background pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-linear-to-b from-white" />
      )}
      {bottom && (
        <div className="dark:from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t from-white" />
      )}
    </div>
  )
}
