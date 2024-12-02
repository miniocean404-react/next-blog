import "server-only" // <-- ensure this file cannot be imported from the client

import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { cache } from "react"
import { createCallerFactory } from "@/server/trpc/server"
import { createTRPCContext } from "@/server/trpc/context"
import { createReactQueryClient } from "@/server/client/react-query-client"
import { trpcRouter } from "@/server/routers"

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(createReactQueryClient)
const caller = createCallerFactory(trpcRouter)(createTRPCContext)
export const { trpc, HydrateClient } = createHydrationHelpers<typeof trpcRouter>(
  caller,
  getQueryClient,
)
