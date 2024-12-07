import type { RegisterFormSchemaType } from "@/utils/schema/register"
import React, { useContext, useState, type PropsWithChildren } from "react"

// 可以用 context 存储 auth 状态来进行传递
function useRegisterInfo() {
  const [data, setData] = useState<RegisterFormSchemaType>({
    email: "",
    nickname: "",
    password: "",
    pin: "",
  })

  return {
    data,
    set(info: RegisterFormSchemaType): void {
      setData(info)
    },
    clear() {
      setData({
        email: "",
        nickname: "",
        password: "",
        pin: "",
      })
    },
  }
}

const RegisterInfoContext = React.createContext<ReturnType<typeof useRegisterInfo> | null>(
  null,
) as React.Context<ReturnType<typeof useRegisterInfo>>

// Context.Provider 下的所有消费组件，在 Provider.value 变化后，都会 re-render
export function RegisterInfoProvider({ children }: PropsWithChildren<any>) {
  const register = useRegisterInfo()
  return <RegisterInfoContext.Provider value={register} children={children} />
}

export function useRegisterInfoContext() {
  return useContext(RegisterInfoContext)
}
