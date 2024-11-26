// src/auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DB } from "@/utils/db"
import type { loginFormSchemaType } from "@/app/[locale]/login/page"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(DB),
  pages: {
    // 授权登录如果有报错，系统会默认重定向到/api/auth/signin内置页面，我们想重定向自己的页面，可以在配置。
    signIn: "/login",
    // error: "/error",
    // 退出登录后，重定向到首页
    signOut: "/",
  },
  // debug: process.env.NODE_ENV !== "production",
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // 在开发过程中添加此行以信任 localhost
  trustHost: process.env.NODE_ENV !== "production",
  providers: [
    // 登录
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials as loginFormSchemaType
        if (!email || !password) return null

        try {
          const user = await DB.user.findFirst({
            where: {
              email,
            },
            select: {
              id: true,
              nickname: true,
              email: true,
              avatar: true,
              password: true,
            },
          })

          const userRole = await DB.userRole.findUnique({
            where: {
              user_id: user?.id,
            },
            select: {
              role_id: true,
            },
          })

          const role = await DB.role.findUnique({
            where: {
              id: userRole?.role_id,
            },
            select: {
              role_key: true,
            },
          })

          const success = await bcrypt.compare(password, user?.password || "")
          if (!success) return null

          return {
            id: user?.id.toString(),
            name: user?.nickname,
            email: user?.email,
            image: user?.avatar,
            role: role?.role_key,
          }
        } catch (error) {
          return null
        }
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
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    jwt({ token, account, user, profile }) {
      // 用户在登录期间可用
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
