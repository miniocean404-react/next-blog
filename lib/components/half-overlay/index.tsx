import clsx from "clsx"
import styles from "./index.module.scss"
import type { PropsWithChildren } from "react"

export default function HalfOverlay({ children }: Readonly<PropsWithChildren<any>>) {
  return (
    <div className={styles.container}>
      {children}
      <div className={clsx(styles.halfOverlay, styles.left)}></div>
      <div className={clsx(styles.halfOverlay, styles.right)}></div>
    </div>
  )
}
