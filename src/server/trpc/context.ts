import { auth } from "@/auth/core"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

export async function createTRPCContext(opts?: FetchCreateContextFnOptions) {
  const session = await auth()

  return { ...(opts || {}), session }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
