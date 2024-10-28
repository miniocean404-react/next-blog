import { auth } from "@/auth/core"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"

export async function createTRPCContext(opts?: CreateNextContextOptions) {
  const session = await auth()

  return { ...(opts || {}), session }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
