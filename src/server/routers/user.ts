import { sendEmail } from "@/utils/email"
import { genVerificationCode } from "@/utils/id"
import { z } from "zod"
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { db } from "@/db"
import { userModel, userRoleModel, verificationTokenModel } from "@/db/model"
import { and, eq } from "drizzle-orm"
import { hashPassword, isEqualHashPassword } from "@/utils/crypto"

import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { TRPCError } from "@trpc/server"
dayjs.locale("zh-cn")

export const User = appRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { email, password } = opts.input

      const user = await db().query.userModel.findFirst({
        where: (user, { eq }) => and(eq(user.email, email), eq(user.delFlag, false)),
        columns: {
          id: true,
          cuid: true,
          nickname: true,
          email: true,
          avatar: true,
          password: true,
        },
      })

      if (!user) throw new TRPCError({ code: "BAD_REQUEST", message: "用户不存在" })

      const userRole = await db()
        .select()
        .from(userRoleModel)
        .where(eq(userRoleModel.userId, user?.id || 0))

      const role = await db().query.roleModel.findMany({
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
      if (!success) throw new TRPCError({ code: "BAD_REQUEST", message: "密码错误" })

      return {
        id: user?.cuid,
        name: user?.nickname,
        email: user?.email,
        image: user?.avatar,
        role: role.map((item) => item.roleKey).join(","),
      }
    }),
  sendEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts

      const isExist = await db().query.userModel.findFirst({
        where: (user, { eq }) => and(eq(user.email, input.email), eq(user.delFlag, false)),
      })

      if (isExist) throw new TRPCError({ code: "BAD_REQUEST", message: "当前邮箱已存在！" })

      const token = genVerificationCode()

      await db()
        .insert(verificationTokenModel)
        .values({
          identifier: input.email,
          token,
          expires: dayjs().add(1, "hour").format(),
        })

      // 异步发送，优化加载体验
      sendEmail({
        to: input.email,
        subject: "验证码",
        html: `验证码为：${token}`,
      })
    }),
  verificationToken: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        nickname: z.string().optional(),
        token: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { token, email, password, nickname } = opts.input

      const verificationToken = await db().query.verificationTokenModel.findFirst({
        where: (verification, { eq, and }) =>
          and(eq(verification.token, token), eq(verification.delFlag, false)),
      })

      if (email !== verificationToken?.identifier || !verificationToken) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "验证码错误" })
      }

      if (dayjs().isAfter(verificationToken.expires)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "验证码已过期" })
      }

      // ---------------------------------------- 验证码通过，开始注册 ----------------------------------------

      await db()
        .delete(verificationTokenModel)
        .where(eq(verificationTokenModel.token, verificationToken.token))

      // 给密码加盐，密码明文存数据库不安全
      const hashedPassword = hashPassword(password, 10)

      return await db().transaction(async (tx) => {
        await db().insert(userModel).values({
          nickname,
          email,
          password: hashedPassword,
          realPassword: password,
          emailVerified: dayjs().format(),
        })

        const user = await db().query.userModel.findFirst({
          where: (user, { eq, and }) => and(eq(user.email, email), eq(user.delFlag, false)),
        })

        const role = await db().query.roleModel.findFirst({
          where: (role, { eq, and }) => and(eq(role.roleKey, "USER"), eq(role.delFlag, false)),
        })

        if (!user || !role) {
          tx.rollback()
          throw new TRPCError({ code: "BAD_REQUEST", message: "注册失败" })
        }

        await db().insert(userRoleModel).values({
          userId: user.id,
          roleId: role.id,
        })
      })

      // Demo: 更新用户邮箱验证时间
      // await db()
      //   .update(userModel)
      //   .set({
      //     emailVerified: dayjs().format(),
      //   })
      //   .where(eq(userModel.id, user.id))
    }),
})
