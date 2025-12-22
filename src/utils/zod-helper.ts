import { type ZodError } from "zod"
import { createMessageBuilder, fromError } from "zod-validation-error"

const messageBuilder = createMessageBuilder({
  // 最大错误提示数
  maxIssuesInMessage: 1,
  // 错误提示前缀
  prefix: null,
  // 用于控制是否包含错误的属性名称后缀 例如: `id: 1`
  includePath: false,
})

export const formatZodError = (error: ZodError) => {
  return fromError(error, { messageBuilder })
}
