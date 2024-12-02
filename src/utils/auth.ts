import NextAuth, { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { rawApi } from "@/server/client/raw"
import type { loginFormSchemaType } from "@/utils/schema/login"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // debug: process.env.NODE_ENV !== "production",
  // 在开发过程中添加此行以信任 localhost
  trustHost: process.env.NODE_ENV !== "production",
  secret: process.env.AUTH_SECRET,
  // adapter: DrizzleAdapter(db),
  pages: {
    // 授权登录如果有报错，系统会默认重定向到/api/auth/signin内置页面，我们想重定向自己的页面，可以在配置。
    signIn: "/passport/login",
    // error: "/error",
    // 退出登录后，重定向到首页
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  // 自定义 session jwt 编码解码逻辑
  // jwt: {
  //   encode(params) {},
  //   decode(params) {},
  // },
  providers: [
    // 登录
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials as loginFormSchemaType

        const result = await rawApi.User.login.query({ email, password })
        if (result.code !== 200) {
          throw new CredentialsSignin(result.msg, { cause: result })
        }

        return result.data
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // 控制是否允许用户登录。
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // 每次使用 auth () 方法获取 session 信息的时候会调用
    jwt(params) {
      const { token, user, account, profile, trigger } = params

      if (user) {
        token.role = user.role
      }

      return token
    },
    session(params) {
      const { session, token } = params
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }

      return session
    },
  },
})
