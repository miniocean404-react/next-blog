import { auth, signOut } from "@/auth/core"
import { getLocale } from "next-intl/server"

export default async function User() {
  // 从session中获取登录信息
  const session = await auth()
  const locale = await getLocale()

  return (
    <div className="mt-16">
      {session?.user ? (
        <p>
          {JSON.stringify(session.user)}
          <form
            action={async () => {
              "use server"
              // 退出登录后，重定向首页
              await signOut({ redirectTo: `/${locale}` })
            }}
          >
            <button>退出登录</button>
          </form>
        </p>
      ) : (
        <p>未登录</p>
      )}
    </div>
  )
}
