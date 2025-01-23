"use client"

import { api } from "@/server/client/react-query-provider"
import { skipToken } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { ChatInput, ChatLayout, ChatMessage, ChatWindow } from "~/lib/components/mini/chat"
import type { Unsubscribable } from "@trpc/server/observable"
import { rawApi } from "@/server/client/raw"

export default function Ai() {
  const [messages, setMessages] = useState<MessageBody[]>([
    { role: "system", content: "你是豆包，是由字节跳动开发的 AI 人工智能助手" },
  ])

  const unsubscribableRef = useRef<Unsubscribable>()

  function subscription(messages: MessageBody[]) {
    unsubscribableRef.current = rawApi.Ai.aiExchange.subscribe(messages, {
      onData(part) {
        if (part.choices[0].finish_reason === "stop")
          return unsubscribableRef.current?.unsubscribe()

        const answer = part.choices[0].delta.content

        setMessages((prev) => {
          const newMessage = [...prev]

          const preMessageIndex = newMessage.findIndex((message) => message.id === part.id)

          if (preMessageIndex > -1) {
            newMessage[preMessageIndex].content = newMessage[preMessageIndex].content += answer
          } else {
            newMessage.push({
              id: part.id,
              role: "assistant",
              content: answer,
            })
          }

          return newMessage
        })
      },
    })
  }

  const send = (value: string) => {
    unsubscribableRef.current?.unsubscribe()

    setMessages((prev) => {
      const newMessage = [...prev]
      newMessage.push({ role: "user", content: value })
      subscription(newMessage)
      return newMessage
    })
  }

  return (
    <ChatLayout className="h-mini-layout-one-screen">
      <ChatWindow className="md:max-w-mini-layout">
        {messages.map((message, index) => {
          if (message.role === "user" || message.role === "assistant") {
            return (
              <ChatMessage type={message.role} key={index}>
                {message.content}
              </ChatMessage>
            )
          }
        })}
      </ChatWindow>

      <ChatInput className="md:max-w-mini-layout p-3.5 2xl:px-0" onSend={send}></ChatInput>
    </ChatLayout>
  )
}
