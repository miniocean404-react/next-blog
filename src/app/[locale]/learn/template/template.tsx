"use client"
import { useState } from "react"

// 路由切换不会保持状态，会重新创建实例，并且会传递给 layout 中的 children 中的
// layout 会保持里面的状态
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState(0)

  return (
    <div>
      <div onClick={() => setState(state + 1)}>{state}</div>
      {children}
    </div>
  )
}
