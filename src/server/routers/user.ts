import { trpcResult } from "@/server/trpc/shared"
import { sendEmail } from "@/utils/email"
import { genVerificationCode } from "@/utils/id"
import { z } from "zod"
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { db } from "@/db/index"
import { userModel, userRoleModel, verificationTokenModel } from "@/db/model"
import { eq } from "drizzle-orm"
import { hashPassword, isEqualHashPassword } from "@/utils/crypto"

export const User = appRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .query(async (opts) => {
      const { email, password } = opts.input

      const user = await db().query.userModel.findFirst({
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
      if (!success) return trpcResult.failMsg("密码不正确")

      return trpcResult.success({
        id: user?.cuid,
        name: user?.nickname,
        email: user?.email,
        image: user?.avatar,
        role: role.map((item) => item.roleKey).join(","),
      })
    }),
  sendEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts
      const isExist = await db().query.userModel.findFirst({
        where: (user, { eq }) => eq(user.email, input.email),
      })

      if (isExist) return trpcResult.failMsg("当前邮箱已存在！")

      const token = genVerificationCode()

      await db()
        .insert(verificationTokenModel)
        .values({
          identifier: input.email,
          token,
          expires: new Date(Date.now() + 60 * 60 * 1000).toLocaleString(),
        })

      // 异步发送，优化加载体验
      sendEmail({
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
        password: z.string(),
        nickname: z.string(),
        token: z.string(),
      }),
    )
    .query(async (opts) => {
      const { token, email, password, nickname } = opts.input

      const verificationToken = await db().query.verificationTokenModel.findFirst({
        where: (verification, { eq, and }) => eq(verification.token, token),
      })

      if (email !== verificationToken?.identifier || !verificationToken)
        return trpcResult.failMsg("验证码错误")

      if (new Date(verificationToken.expires) < new Date())
        return trpcResult.failMsg("验证码已过期")

      // ---------------------------------------- 验证码通过，开始注册 ----------------------------------------

      await db()
        .delete(verificationTokenModel)
        .where(eq(verificationTokenModel.token, verificationToken.token))

      // 给密码加盐，密码明文存数据库不安全
      const hashedPassword = hashPassword(password, 10)

      await db().insert(userModel).values({
        nickname,
        email,
        password: hashedPassword,
        realPassword: password,
        emailVerified: new Date().toLocaleString(),
      })

      const user = await db().query.userModel.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      })

      const role = await db().query.roleModel.findFirst({
        where: (role, { eq }) => eq(role.roleKey, "USER"),
      })

      if (user && role) {
        await db().insert(userRoleModel).values({
          userId: user.id,
          roleId: role.id,
        })
      }

      // Demo: 更新用户邮箱验证时间
      // await db()
      //   .update(userModel)
      //   .set({
      //     emailVerified: new Date().toLocaleString(),
      //   })
      //   .where(eq(userModel.id, user.id))

      return trpcResult.successMsg("注册成功")
    }),
})
