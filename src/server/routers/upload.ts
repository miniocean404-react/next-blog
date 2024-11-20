// 上传另一种写法，只能单独传文件：https://github.com/trpc/trpc/blob/5c3057a917ab078fb7d0620e614f884a9c65d682/examples/minimal-content-types/server/index.ts#L7

import { uploadImageKit } from "@/utils/oss"
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { zfd } from "zod-form-data"
import { TRPCError } from "@trpc/server"

export const Upload = appRouter({
  uploadImageKit: publicProcedure
    .input(
      zfd.formData({
        file: zfd.file(),
      }),
    )
    .mutation(async (opts) => {
      const file = opts.input.file
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      if (!file.type.startsWith("image/")) {
        throw new TRPCError({ message: "只能上传图片", code: "UNSUPPORTED_MEDIA_TYPE" })
      }

      const result = await uploadImageKit(buffer, file.name)
      return result
    }),
})
