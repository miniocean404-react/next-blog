import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { z } from "zod"

export const User = appRouter({
  getUserPermission: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .query(async (opts) => {
      const { name, email } = opts.input

      const res = await DB?.user.findUnique({
        where: {
          nickname: name,
          email,
        },
        // include 是否显示 roles 表的数据, select 查询只展示的字段
        select: {
          nickname: true,
          email: true,
        },
      })

      return res
    }),
})
