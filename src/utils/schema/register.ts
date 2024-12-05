import { z } from "zod"

export const registerFormSchema = z.object({
  email: z.string().email({ message: "错误的邮箱格式" }),
  nickname: z.string().optional(),
  password: z.string().min(6, { message: "密码不能为空,并且密码至少 6 位" }),
  pin: z.string().min(6, { message: "您的验证码必须为 6 个字符" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>
