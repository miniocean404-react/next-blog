// app/_trpc/routers/product.ts
import { publicProcedure } from "../procedure"
import { router } from "../index"

export const Prodcut = router({
  getAllProducts: publicProcedure.query(async (opts) => {
    return {
      status: 200,
      data: [],
      message: "success",
    }
  }),

  getProductById: publicProcedure
    .input((val) => val)
    .query(async (opts) => {
      return {
        status: 200,
        data: {},
        message: "success",
      }
    }),
})
