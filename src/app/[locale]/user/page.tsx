import { auth } from "@/utils/auth/core"
import { getLocale } from "next-intl/server"

export default async function User() {
  // 从session中获取登录信息
  const session = await auth()
  const locale = await getLocale()

  return (
    <div className="mt-16">
      {session?.user ? <div>{JSON.stringify(session.user)}</div> : <p>未登录</p>}
    </div>
  )
}
