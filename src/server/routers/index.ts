// app/_trcp/index.ts
import { Demo } from "./demo"
import { Ai } from "./ai"
import { Upload } from "./upload"
import { User } from "./user"

import { appRouter } from "../trpc/server"

/**
 * 每个 router 有自己的 namespace，下面的 User 和 Product 就是 namespace
 * trpcClient.User.getUserList
 * trpcClient.Prodcut.getAllProducts
 */
export const trpcRouter = appRouter({
  Demo,
  Ai,
  Upload,
  User,
})

/**
 * 如果想要 UserRouter 与 ProductRouter 合并，并在同一 namespace 下
 * trpcClient.getUserList
 * rpcClient.getAllProducts
 */
// export const trpcRouter = t.mergeRouters(User, Product);

export type TRPCRouter = typeof trpcRouter
