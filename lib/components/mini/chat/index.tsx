"use client"
import clsx from "clsx"
// 聊天框原理：https://juejin.cn/post/7306693980959588379

import styles from "./index.module.scss"

import type { PropsWithChildren } from "react"

interface ChatProps {
  className?: string
}

export function Chat(props: PropsWithChildren<ChatProps>) {
  const { className } = props

  return (
    <div className={clsx(styles.chat, className)}>
      <div className={styles.reverse}>
        {/* <div className={styles["place-holder"]}></div> */}
        <div className={styles.messages}>{props.children}</div>
      </div>
    </div>
  )
}

interface MessageProps {
  className?: string
  type: "sned" | "receive"
}

export function Message(props: PropsWithChildren<MessageProps>) {
  return (
    <div className={clsx(styles.message, { [styles.receive]: props.type === "sned" })}>
      <div className={styles.beautiful}>{props.children}</div>
    </div>
  )
}
