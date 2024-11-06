"use client"

import { trpcClient } from "@/trpc/client"
import type { Unsubscribable } from "@trpc/server/observable"
import { useRef, useState, type SyntheticEvent } from "react"
import { Chat, Message } from "~/lib/components/mini/chat"

export default function Ai() {
  const problemRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<MessageBody[]>([])
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

  const onInput = async (e: SyntheticEvent<HTMLInputElement>) => {}

  const send = () => {
    if (problemRef.current) {
      const content = problemRef.current.value

      getAnswer(problemRef.current.value)
      setMessages((prev) => {
        const newMessage = [...prev]
        newMessage.push({ type: "send", content })
        return newMessage
      })
      problemRef.current.value = ""
    }
  }

  return (
    <div className="mt-16">
      <Chat className="h-[calc(100vh-64px-100px)]">
        {messages.map((message, index) => (
          <Message type={message.type} key={index}>
            {message.content}
          </Message>
        ))}
      </Chat>

      <input ref={problemRef} type="text" onInput={onInput} />
      <button onClick={send}>发送</button>
    </div>
  )
}
