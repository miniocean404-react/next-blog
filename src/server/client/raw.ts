import { createTRPCClient } from "@trpc/client"
import { type TRPCRouter } from "../routers/index"
import { links } from "./link"

export const rawApi = createTRPCClient<TRPCRouter>({
  links,
})

// 服务侧调用自身 tprc
// export const createCaller = createCallerFactory(trpcRouter)
// const caller = createCaller({ session: await auth() })
