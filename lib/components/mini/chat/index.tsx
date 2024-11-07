"use client"
import clsx from "clsx"
// 聊天框原理：https://juejin.cn/post/7306693980959588379

import styles from "./index.module.scss"

import { useEffect, useRef, type PropsWithChildren } from "react"
import { ArrowUp } from "lucide-react"

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

interface ChatMessageProps {
  className?: string
  type: "send" | "receive"
}

export function ChatMessage(props: PropsWithChildren<ChatMessageProps>) {
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

interface ChatInputProps {
  className?: string
  placeholder?: string
  maxLength?: number
  minLength?: number
  rows?: number
  cols?: number
  onInput?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void
}

export function ChatInput(props: Readonly<PropsWithChildren<ChatInputProps>>) {
  props = { ...{ placeholder: "发消息", rows: 1, cols: 20 }, ...props }

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const calcRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    resizeTextarea()
  }, [])

  const onInput = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    resizeTextarea()
    if (props.onInput) props.onInput(e)
  }

  function resizeTextarea() {
    if (textareaRef.current && calcRef.current) {
      calcRef.current.value = textareaRef.current.value
      const total = calcRef.current.scrollHeight
      const lineHeight = parseInt(getComputedStyle(calcRef.current).lineHeight)
      const row = total / lineHeight

      textareaRef.current.style.height = `${row * lineHeight}px`
    }
  }

  return (
    <div className={styles.chatInput}>
      <div className={styles.textareaBox}>
        <textarea
          className={styles.textarea}
          ref={textareaRef}
          rows={props.rows}
          cols={props.cols}
          autoComplete="off"
          placeholder={props.placeholder}
          onInput={onInput}
          onBlur={props.onBlur}
        />

        <textarea className={styles.calc} ref={calcRef} />
      </div>

      <div className={styles.tool}>
        <div className={styles.divider}></div>

        <button className={styles.sendButton}>
          <ArrowUp size={24}></ArrowUp>
        </button>
      </div>
    </div>
  )
}
