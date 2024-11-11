"use server"

import { z } from "zod"
import { DB } from "../index"
// 看出来 prisma 多方便了吧，直接将 User表的数据类型映射过来了
// 因为我们使用
import { User } from "@prisma/client"

const GetUserByIdSchema = z.object({
  id: z.string(),
})

export async function getUserById({ id }: typeof GetUserByIdSchema._type) {
  try {
    const data = await DB.user.findMany({
      where: { id },
    })
    return data
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

const UserSchema: z.ZodType<Omit<User, "id">> = z.object({
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

export async function createUser(body: typeof UserSchema._type) {
  try {
    UserSchema.parse(body)

    const result = await DB.user.create({ data: body })
    return result
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

const UpdateUserByIdSchema = z.object({
  id: z.string(),
})

export async function updateUser(body: typeof UpdateUserByIdSchema._type) {
  try {
    UserSchema.parse(body)

    const result = await DB.user.update({
      where: { id: body.id },
      data: { email: "1037306928qq.com" },
    })
    return result
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

    const result = await DB.user.delete({
      where: { id: body.id },
    })
    return result
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
