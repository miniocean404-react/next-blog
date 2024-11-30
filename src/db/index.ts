// app/lib/db.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? [{ level: "query", emit: "stdout" }, "error", "warn"]
      : ["error"],
})

export const DB = globalThis.DB ?? prisma
if (process.env.NODE_ENV !== "production") globalThis.DB = prisma

import { drizzle } from "drizzle-orm/planetscale-serverless"
import * as schema from "./model"

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
})
