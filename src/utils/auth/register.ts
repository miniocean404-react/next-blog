"use server"

import bcrypt from "bcryptjs"
import { DB } from "@/utils/db"
import type { RegisterFormSchemaType } from "@/app/[locale]/register/page"

export const register = async (data: RegisterFormSchemaType) => {
  const isExist = await DB.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (isExist) {
    return {
      error: "当前邮箱已存在！",
    }
  }

  // 给密码加盐，密码明文存数据库不安全
  const hashedPassword = await bcrypt.hash(data.password, 10)

  await DB.user.create({
    data: {
      name: data.username,
      email: data.email,
      password: hashedPassword,
      realPassword: data.password,
      roles: {
        create: {
          role: {
            create: {
              name: "USER",
              permissions: {
                create: {
                  permission: {
                    create: {
                      name: "READ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
}
