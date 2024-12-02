"use client"

import { api } from "@/server/client/react-query-provider"
import { TRPCClientError } from "@trpc/client"
import type { ChangeEvent } from "react"
import toast from "react-hot-toast"

export default function Upload() {
  const { mutate } = api.Upload.uploadImageKit.useMutation()

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files?.item(0)

    if (file) {
      const close = toast.loading("上传中...")

      try {
        const form = new FormData()
        form.set("file", file)

        // const res = await trpcClient.Prodcut.getProductById.query({ id: "1" })
        mutate(form, {
          onSuccess(data) {
            data.data?.url && toast.success(`上传成功: ${data.data.url}`)
          },
        })
      } catch (error: unknown) {
        if (error instanceof TRPCClientError) {
          // 完整响应体
          // console.log(error.shape)
          toast.error(error.message)
        }
      } finally {
        toast.dismiss(close)
      }
    }
  }

  return (
    <div className="mt-16">
      <input type="file" name="" id="" onChange={upload} />
    </div>
  )
}
