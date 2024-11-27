"use client"
import clsx from "clsx"
// 聊天框原理：https://juejin.cn/post/7306693980959588379

import { useEffect, useRef, type PropsWithChildren, type KeyboardEvent, useState } from "react"
import { ArrowUp } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { Key } from "@/constant/hotkey"

interface ChatLayoutProps {
  className?: string
}

export function ChatLayout(props: PropsWithChildren<ChatLayoutProps>) {
  const { className } = props
  return <div className={clsx("flex flex-col", className)}>{props.children}</div>
}

interface ChatWindowProps {
  className?: string
}

export function ChatWindow(props: PropsWithChildren<ChatWindowProps>) {
  const { className } = props

  return (
    <div
      className={clsx(
        "flex-grow overflow-hidden",
        // 设置消息少的时候消息在顶部
        "flex flex-col justify-start",
        className,
      )}
    >
      <div
        className={clsx(
          "overflow-auto flex flex-col-reverse justify-start p-4",
          // webkit 使用示例: "[&::-webkit-scrollbar]:block"
          "scrollbar",
        )}
      >
        {/* flex 内容底部填充这个可以在初始时候将对话内容撑起来，这是一种方法 */}
        {/* <div className={"flex-grow flex-shrink"}></div> */}
        {props.children}
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
    <div>
      <div className={clsx("w-full flex", { ["flex-row-reverse"]: props.type === "send" })}>
        <div
          className={clsx(
            "rounded bg-[var(--mini-c-chat-message-card-bg)] text-primary p-2 w-fit max-w-[70%]",
            {
              "bg-transparent max-w-full": props.type === "receive",
            },
          )}
        >
          {props.children}
        </div>
      </div>

      <div className={"h-10"}></div>
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
  onFocus?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void
  onSend?: (value: string, e?: React.SyntheticEvent<HTMLButtonElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}

export function ChatInput(props: Readonly<PropsWithChildren<ChatInputProps>>) {
  props = { ...{ placeholder: "发消息", rows: 1, cols: 20 }, ...props }

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const calcRef = useRef<HTMLTextAreaElement>(null)
  const [mutiLine, setmutiLine] = useState(false)

  useHotkeys<HTMLTextAreaElement>(
    Key.Enter,
    (e) => {
      send()
    },
    {
      enabled: true,
      preventDefault: true,
      enableOnFormTags: ["textarea"],
    },
  )

  useEffect(() => {
    resizeTextarea()
  }, [])

  const onFocus = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (props.onFocus) props.onFocus(e)
  }

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

      if (!mutiLine && row > 1) setmutiLine(true)
      if (mutiLine && row === 1) setmutiLine(false)

      textareaRef.current.style.height = `${row * lineHeight}px`
    }
  }

  const onSend = (e?: React.SyntheticEvent<HTMLButtonElement>) => {
    send(e)
  }

  const send = (e?: React.SyntheticEvent<HTMLButtonElement>) => {
    if (textareaRef.current && textareaRef.current?.value !== "") {
      props.onSend && props.onSend(textareaRef.current.value, e)
      textareaRef.current.value = ""
      setmutiLine(false)
      resizeTextarea()
    }
  }

  return (
    <div className={clsx("w-full mx-auto", props.className)}>
      <div
        className={clsx(
          "relative rounded-2xl bg-background p-3 pl-3.5 shadow-[var(--mini-c-chat-input-card-shadow)] border border-solid grid gap-2.5  grid-cols-[auto_1fr_auto]",
          "[grid-template-areas:'left-tools_input-area_right-tools']",
          {
            "[grid-template-areas:'input-area_input-area_input-area''left-tools_._right-tools']":
              mutiLine,
          },
        )}
      >
        <div
          className={
            "relative text-base leading-6 self-center cursor-text w-full bg-inherit [grid-area:input-area]"
          }
        >
          <textarea
            className={clsx(
              "w-full bg-inherit caret-blue-400 min-w-32 max-h-44 p-0 resize-none outline-none overflow-auto align-bottom",
              "scrollbar",
            )}
            ref={textareaRef}
            rows={props.rows}
            cols={props.cols}
            autoComplete="off"
            placeholder={props.placeholder}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={props.onBlur}
            onKeyDown={props.onKeyDown}
          />

          <textarea
            className={clsx(
              "w-full border-0 box-border not-italic font-normal tracking-normal p-0 indent-0 normal-case !min-h-0 !max-h-none !h-0 !invisible !overflow-hidden !absolute !z-[1000] !top-0 !right-0",
              "[tab-size:8] [text-rendering:auto]",
            )}
            ref={calcRef}
          />
        </div>

        <div className={"flex items-center [grid-area:right-tools]"}>
          <div className={"bg-border w-[1] h-5 my-0 ml-1 mr-3"}></div>

          <button
            className={clsx(
              "w-8 h-8 rounded-[50%] bg-blue-600 text-white",
              "flex justify-center items-center cursor-pointer",
              "hover:bg-blue-700 hover:text-white/80",
            )}
            onClick={onSend}
          >
            <ArrowUp size={24}></ArrowUp>
          </button>
        </div>
      </div>
    </div>
  )
}
