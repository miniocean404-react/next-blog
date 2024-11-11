// app/lib/db.ts
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? [{ emit: "stdout", level: "query" }, "error", "warn"]
      : ["error"],
})

const DB = globalThis.DB ?? prisma

export { DB }
