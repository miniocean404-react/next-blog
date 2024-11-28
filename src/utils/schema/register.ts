import { z } from "zod"

export const registerFormSchema = z.object({
  email: z.string().email({ message: "无效的邮箱格式" }),
  username: z.string().min(1, { message: "用户名不能为空" }),
  password: z.string().min(6, { message: "密码不能为空,并且密码至少 6 位" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export const codeFormSchema = z.object({
  pin: z.string().min(6, {
    message: "您的一次性密码必须为6个字符。",
  }),
})
