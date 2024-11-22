"use client"

import { use, useActionState } from "react"
import z from "zod"
import { useRouter } from "next/navigation"
import { register } from "@/utils/auth/register"

const registerFormSchema = z.object({
  email: z.string().email({ message: "无效的邮箱格式" }),
  username: z.string().min(1, { message: "用户名不能为空" }),
  password: z.string().min(1, { message: "密码不能为空" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export default function Login({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const { error } = use<{ error: string }>(searchParams)
  const router = useRouter()

  type State = {
    errors?: string
    message?: string
  }

  // 初始化表单状态
  const [state, formAction, isPending] = useActionState<State, FormData>(onRegister, {
    errors: "",
    message: "",
  })

  // 调用后端接口返回数据
  async function onRegister(cur: State, formData: FormData): Promise<State> {
    const values = {
      email: formData.get("email")?.toString() ?? "",
      username: formData.get("username")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    }

    const valid = registerFormSchema.safeParse(values)
    if (!valid.success) {
      return { errors: valid.error.errors[0].message }
    }

    const result = await register(values)
    if (result?.error) {
      return { errors: result.error }
    } else {
      // 注册成功，跳到登录页面
      router.push("/login")
      return { errors: "" }
    }
  }

  return (
    <div className="mt-16 flex justify-center items-center">
      <div className="p-1.5">
        <h1 className="text-lg">注册</h1>

        <form action={formAction} noValidate>
          <div>
            <label>邮箱</label>
            <input name="email" type="email" autoComplete="off" />
          </div>
          <div>
            <input name="username" type="text" />
          </div>
          <div>
            <input name="password" type="password" autoComplete="new-password" />
          </div>

          <button type="submit" disabled={isPending}>
            注册
          </button>
        </form>

        {/* 显示error */}
        {state.errors && <p className="mt-2 text-sm text-red-500">{state.errors}</p>}
      </div>

      <div className="text-red-500">{error}</div>
    </div>
  )
}

/**
 * 只能在 form 表达内嵌入下方内容时候才能使用 useFormStatus，也就是多层级
 * pending: 是否正在提交
 * data：formData
 * method：get | post
 * action：一个传递给父级 <form> 的 action 属性的函数引用。如果没有父级 <form>，则该属性为 null。如果在 action 属性上提供了 URI 值，或者未指定 action 属性，status.action 将为 null
 * ```js
 * function Submit() {
 *   const status = useFormStatus()
 *
 *   return <button disabled={status.pending}>提交</button>
 * }
 * ```
 * const status = useFormStatus()
 */
