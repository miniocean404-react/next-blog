// app/lib/trpc/context.ts
import { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { getSession } from "next-auth/react"

export async function createTRPCContext(opts?: CreateNextContextOptions) {
  const session = await getSession()
  return { ...(opts || {}), session }
}

export type Context = typeof createTRPCContext
