"use client"

import { trpcClient } from "@/server/trpc/client"
import type { Unsubscribable } from "@trpc/server/observable"
import { useRef, useState, type SyntheticEvent } from "react"
import { ChatWindow, ChatInput, ChatMessage, ChatLayout } from "~/lib/components/mini/chat"

export default function Ai() {
  const problemRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<MessageBody[]>([
    {
      id: 1,
      content: "你好，我是 AI 机器人，有什么问题可以问我",
      type: "send",
    },
  ])
  const answerRef = useRef<Unsubscribable>()

  const getAnswer = async (content: string) => {
    answerRef.current?.unsubscribe()

    answerRef.current = trpcClient.Ai.aiExchange.subscribe(
      { content },
      {
        onData(value: Answer | "done") {
          if (value === "done") {
            return answerRef.current?.unsubscribe()
          }

          const answer = value.choices[0].delta.content

          setMessages((prev) => {
            const newMessage = [...prev]

            const preMessageIndex = newMessage.findIndex((message) => message.id === value.id)
            if (preMessageIndex > -1) {
              newMessage[preMessageIndex].content = newMessage[preMessageIndex].content += answer
            } else {
              newMessage.push({
                id: value.id,
                type: "receive",
                content: answer,
              })
            }

            return newMessage
          })
        },
      },
    )
  }

  const send = (value: string) => {
    getAnswer(value)
    setMessages((prev) => {
      const newMessage = [...prev]
      newMessage.push({ type: "send", content: value })
      return newMessage
    })
  }

  return (
    <div className="mt-16">
      <ChatLayout className="h-[calc(100dvh-64px)]  ">
        <ChatWindow>
          <div className="w-full mx-auto md:max-w-mini-layout">
            {messages.map((message, index) => (
              <ChatMessage type={message.type} key={index}>
                {message.content}
              </ChatMessage>
            ))}
          </div>
        </ChatWindow>

        <ChatInput className="p-3.5 2xl:px-0 md:max-w-mini-layout" onSend={send}></ChatInput>
      </ChatLayout>
    </div>
  )
}
