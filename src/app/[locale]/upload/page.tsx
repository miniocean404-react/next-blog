"use client"

import { trpcClient } from "@/server/trpc/client"
import type { ChangeEvent } from "react"

export default function Upload() {
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files?.item(0)
    const form = new FormData()

    if (file) {
      form.set("file", file)
      trpcClient.Prodcut.getProductById.query
      // trpcClient.Upload.uploadImageKit.mutate(form)
    }
  }

  return (
    <div className="mt-16">
      <input type="file" name="" id="" onChange={upload} />
    </div>
  )
}
