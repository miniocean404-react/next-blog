import { drizzle, type AnyMySql2Connection, type MySql2Database } from "drizzle-orm/mysql2"
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

export let client: MySql2Database<typeof schema> & {
  $client: AnyMySql2Connection
}

export function db() {
  if (client) return client

  if (process.env.NEXT_RUNTIME === "nodejs") {
    client = drizzle(process.env.DATABASE_URL, {
      schema,
      mode: "default",
    })

    return client
  }

  return client
}
