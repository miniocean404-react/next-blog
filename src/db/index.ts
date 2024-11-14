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
