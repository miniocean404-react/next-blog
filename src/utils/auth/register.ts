"use server"

import { trpcResult } from "@/server/trpc/shared"
import { hashPassword } from "@/utils/crypto"
import { db, DB } from "@/db"
import type { RegisterFormSchemaType } from "@/utils/schema/register"
import { userModel } from "@/db/model"

export const register = async (data: RegisterFormSchemaType) => {
  const isExist = await db.query.userModel.findFirst({
    where: (user, { eq }) => eq(user.email, data.email),
  })

  if (isExist) return trpcResult.failMsg("当前邮箱已存在！")

  // 给密码加盐，密码明文存数据库不安全
  const hashedPassword = hashPassword(data.password, 10)

  db.insert(userModel).values({
    nickname: data.username,
    email: data.email,
    password: hashedPassword,
    realPassword: data.password,
  })

  const user = await db.query.userModel.findFirst({
    where: (user, { eq }) => eq(user.email, data.email),
  })

  const role = await db.query.roleModel.findFirst({
    where: (role, { eq }) => eq(role.roleKey, "USER"),
  })

  if (user && role) {
    await DB.userRole.create({
      data: {
        user_id: user.id,
        role_id: role.id,
      },
    })
  }

  return trpcResult.successMsg("数据记录成功")
}
