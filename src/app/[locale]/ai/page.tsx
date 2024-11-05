"use client"

import { trpcClient } from "@/trpc/client"
import { useEffect, useRef, useState, type SyntheticEvent } from "react"

export default function Ai() {
  const [answer, setAnswer] = useState<string>("")
  const problemRef = useRef<HTMLInputElement>(null)

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
    <div className="mt-32">
      <input ref={problemRef} type="text" onInput={onInput} />
      <button onClick={send}>发送</button>
      <div className="text-4xl font-bold">{answer}</div>
    </div>
  )
}
