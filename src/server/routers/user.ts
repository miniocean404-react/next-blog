import { sendEmail } from "@/utils/email"
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { z } from "zod"
import { genVerificationCode } from "@/utils/id"

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

      return null
    }),
})
