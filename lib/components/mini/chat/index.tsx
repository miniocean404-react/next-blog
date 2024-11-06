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
        <div>{props.children}</div>
      </div>
    </div>
  )
}

interface MessageProps {
  className?: string
  type: "send" | "receive"
}

export function Message(props: PropsWithChildren<MessageProps>) {
  return (
    <div className={styles.message}>
      <div className={clsx(styles.box, { [styles.send]: props.type === "send" })}>
        <div className={clsx(styles.beautiful, { [styles.receiveCard]: props.type === "receive" })}>
          {props.children}
        </div>
      </div>

      <div className={styles.operate}></div>
    </div>
  )
}
