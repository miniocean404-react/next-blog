import { trpcResult } from "@/server/trpc/shared"
import { sendEmail } from "@/utils/email"
import { genVerificationCode } from "@/utils/id"
import { z } from "zod"
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"

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

      const res = await DB?.user.findUnique({
        where: {
          nickname: name,
          email,
        },
        // include 是否显示 roles 表的数据, select 查询只展示的字段
        select: {
          nickname: true,
          email: true,
        },
      })

      return res
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

      await DB?.verificationToken.create({
        data: {
          identifier: input.email,
          token,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
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

      const verificationToken = await DB?.verificationToken.findUnique({
        where: {
          token: input.token,
        },
      })

      if (input.email !== verificationToken?.identifier || !verificationToken)
        return trpcResult.failMsg("验证码错误")

      if (verificationToken.expires < new Date()) return trpcResult.failMsg("验证码已过期")

      const user = await DB?.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
        },
      })

      if (!user) return trpcResult.failMsg("激活失败，请联系管理员")

      await DB?.verificationToken.delete({
        where: {
          token: verificationToken.token,
        },
      })

      await DB?.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })

      return trpcResult.successMsg("激活成功")
    }),
})
