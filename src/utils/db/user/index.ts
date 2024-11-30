"use server"

import { z } from "zod"
import { db } from "../index"
// 看出来 prisma 多方便了吧，直接将 User表的数据类型映射过来了
// 因为我们使用

const UserSchema = z.object({
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  isMachine: z.boolean(),
  createdAt: z.date(),
  subscribed: z.boolean(),
  source: z.string().nullable(),
  defaultWorkspace: z.string().nullable(),
})

const UpdateUserByIdSchema = z.object({
  id: z.string(),
})

export async function updateUser(body: typeof UpdateUserByIdSchema._type) {
  try {
    UserSchema.parse(body)

    // return await DB.user.update({
    //   where: { id: body.id },
    //   data: { email: "1037306928qq.com" },
    // })
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

const DeleteUserByIdSchema = z.object({
  id: z.string(),
})

export async function deleteUser(body: typeof DeleteUserByIdSchema._type) {
  try {
    UserSchema.parse(body)

    // return await DB.user.delete({
    //   where: { id: body.id },
    // })
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
