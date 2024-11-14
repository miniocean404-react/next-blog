"use server"

import bcrypt from "bcryptjs"
import { DB } from "@/db"

export const register = async (data: any) => {
  const existUser = await DB.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (existUser) {
    return {
      error: "当前邮箱已存在！",
    }
  }

  // 给密码加盐，密码明文存数据库不安全
  const hashedPassword = await bcrypt.hash(data.password, 10)

  await DB.user.create({
    data: {
      name: data.username,
      password: hashedPassword,
      email: data.email,
    },
  })
}
