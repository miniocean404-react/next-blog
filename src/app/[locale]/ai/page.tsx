"use client"

import { trpcClient } from "@/trpc/client"
import { useRef, useState, type SyntheticEvent } from "react"
import { Chat, Message } from "~/lib/components/mini/chat"

export default function Ai() {
  const [answer, setAnswer] = useState<string>("")
  const problemRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState(Array.from({ length: 2 }))

  const getAnswer = async (content: string) => {
    const unsubscribable = trpcClient.Ai.aiExchange.subscribe(
      { content },
      {
        onData(value: Answer | "done") {
          if (value === "done") {
            return unsubscribable.unsubscribe()
          }
          setAnswer((prev) => prev + value.choices[0].delta.content)
        },
      },
    )
  }

  const onInput = async (e: SyntheticEvent<HTMLInputElement>) => {}

  const send = () => {
    if (problemRef.current) {
      getAnswer(problemRef.current.value)
      problemRef.current.value = ""
    }
  }

  return (
    <div className="mt-16">
      <Chat className="h-[calc(100vh-64px-100px)]">
        {message.map((_, index) => (
          <Message type={index % 2 === 1 ? "receive" : "sned"} key={index}>
            1{index.toString().repeat(5)}
          </Message>
        ))}
      </Chat>

      <input ref={problemRef} type="text" onInput={onInput} />
      <button onClick={send}>发送</button>
      <div className="text-4xl font-bold">{answer}</div>
    </div>
  )
}
