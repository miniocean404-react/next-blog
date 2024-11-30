// src/auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import type { loginFormSchemaType } from "@/app/[locale]/passport/login/page"
import { isEqualHashPassword } from "@/utils/crypto"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: DrizzleAdapter(db),
  pages: {
    // 授权登录如果有报错，系统会默认重定向到/api/auth/signin内置页面，我们想重定向自己的页面，可以在配置。
    signIn: "/passport/login",
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
          const user = await db.query.userModel.findFirst({
            where: (user, { eq }) => eq(user.email, email),
            columns: {
              id: true,
              cuid: true,
              nickname: true,
              email: true,
              avatar: true,
              password: true,
            },
          })

          const userRole = await db.query.userRoleModel.findMany({
            where: (userRole, { eq }) => eq(userRole.userId, user?.id || 0),
            columns: {
              roleId: true,
            },
          })

          const role = await db.query.roleModel.findMany({
            where: (role, { inArray }) =>
              inArray(
                role.id,
                userRole.map((item) => item.roleId),
              ),
            columns: {
              roleKey: true,
            },
          })

          const success = isEqualHashPassword(password, user?.password || "")
          if (!success) return null

          return {
            id: user?.cuid,
            name: user?.nickname,
            email: user?.email,
            image: user?.avatar,
            role: role.map((item) => item.roleKey).join(","),
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
