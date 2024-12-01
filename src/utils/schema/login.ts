import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("无效的邮箱格式"),
  password: z.string().min(1, {
    message: "不能为空",
  }),
})

export type loginFormSchemaType = z.infer<typeof loginFormSchema>
