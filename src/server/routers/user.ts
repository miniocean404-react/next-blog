import { trpcResult } from "@/server/trpc/shared"
import { sendEmail } from "@/utils/email"
import { genVerificationCode } from "@/utils/id"
import { z } from "zod"
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { db } from "@/db"
import { userModel, verificationTokenModel } from "@/db/model"
import { eq } from "drizzle-orm"

export const User = appRouter({
  getUserPermission: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .query(async (opts) => {
      const { name, email } = opts.input

      if (name && email) {
        const res = await db.query.userModel.findFirst({
          where: (user, { eq, and }) => and(eq(user.email, email), eq(user.nickname, name)),
          columns: {
            nickname: true,
            email: true,
          },
        })

        return res
      }
    }),
  sendEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts
      const token = genVerificationCode()

      db.insert(verificationTokenModel).values({
        identifier: input.email,
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })

      await sendEmail({
        to: input.email,
        subject: "验证码",
        html: `验证码为：${token}`,
      })

      return trpcResult.successMsg("验证码已发送")
    }),
  verificationToken: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        token: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts

      const verificationToken = await db.query.verificationTokenModel.findFirst({
        where: (verification, { eq, and }) => eq(verification.token, input.token),
      })

      if (input.email !== verificationToken?.identifier || !verificationToken)
        return trpcResult.failMsg("验证码错误")

      if (verificationToken.expires < new Date()) return trpcResult.failMsg("验证码已过期")

      const user = await db.query.userModel.findFirst({
        where: (user, { eq }) => eq(user.email, input.email),
        columns: {
          id: true,
        },
      })

      if (!user) return trpcResult.failMsg("激活失败，请联系管理员")

      db.delete(verificationTokenModel).where(
        eq(verificationTokenModel.token, verificationToken.token),
      )

      db.update(userModel)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(userModel.id, user.id))

      return trpcResult.successMsg("激活成功")
    }),
})
