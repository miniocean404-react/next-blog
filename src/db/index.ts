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

import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from "./model"

// 创建数据库连接池
// const poolConnection = mysql.createPool({
//   host: "127.0.0.1",
//   port: 3306,
//   user: "root",
//   password: "123456",
//   database: "knowledge",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// })

// drizzle(poolConnection)

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
  mode: "default",
})
