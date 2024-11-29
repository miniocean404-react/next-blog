import type { RegisterFormSchemaType } from "@/utils/schema/register"
import React, { useContext, useState, type PropsWithChildren } from "react"

const RegisterInfoContext = React.createContext<RegisterFormSchemaType | undefined>({
  email: "",
  username: "",
  password: "",
})

// 可以用 context 存储 auth 状态来进行传递
export function useRegisterInfo() {
  const [info, setInfo] = useState<RegisterFormSchemaType>({
    email: "",
    username: "",
    password: "",
  }) //状态

  return {
    //认证状态
    info,
    //登录
    async set(info: RegisterFormSchemaType): Promise<void> {
      setInfo(info)
    },
    //退出
    clear() {
      setInfo({
        email: "",
        username: "",
        password: "",
      })
    },
  }
}

export function RegisterInfoProvider({ children }: PropsWithChildren<any>) {
  const register = useRegisterInfo()
  return (
    <RegisterInfoContext.Provider value={register.info}>{children}</RegisterInfoContext.Provider>
  )
}

export default function AuthConsumer() {
  return useContext(RegisterInfoContext)
}
