"use server"

import { trpcResult } from "@/server/trpc/shared"
import { hashPassword } from "@/utils/crypto"
import { DB } from "@/utils/db"
import type { RegisterFormSchemaType } from "@/utils/schema/register"

export const register = async (data: RegisterFormSchemaType) => {
  const isExist = await DB.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (isExist) return trpcResult.failMsg("当前邮箱已存在！")

  // 给密码加盐，密码明文存数据库不安全
  const hashedPassword = hashPassword(data.password, 10)

  const user = await DB.user.create({
    data: {
      nickname: data.username,
      email: data.email,
      password: hashedPassword,
      real_assword: data.password,
    },
  })

  const role = await DB.role.findUnique({
    where: {
      role_key: "USER",
    },
  })

  if (user && role) {
    await DB.userRole.create({
      data: {
        user_id: user.id,
        role_id: role.id,
      },
    })
  }

  return trpcResult.successMsg("注册成功")
}
