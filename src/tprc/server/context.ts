// app/lib/trpc/context.ts
import { CreateNextContextOptions } from "@trpc/server/adapters/next"

export async function createTRPCContext(opts?: CreateNextContextOptions) {
  // const session = await getServerSession();
  // 模拟 session
  const session = { user: { id: 1, name: "xfz", role: "admin" } }
  return { ...(opts || {}), session }
}

export type Context = typeof createTRPCContext
