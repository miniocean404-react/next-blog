// app/lib/db.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? [{ emit: "stdout", level: "query" }, "error", "warn"]
      : ["error"],
})

const DB = prisma

export { DB }
