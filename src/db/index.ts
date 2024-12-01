import { drizzle, type AnyMySql2Connection, type MySql2Database } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from "./model"

export let client: MySql2Database<typeof schema> & {
  $client: AnyMySql2Connection
}

export function db() {
  if (client) return client

  if (process.env.NEXT_RUNTIME === "nodejs") {
    // 创建数据库连接池
    const poolConnection = mysql.createPool({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "123456",
      database: "knowledge",
      // 连接池达到上限时，是否等待连接释放后再继续连接
      waitForConnections: true,
      // 一次创建的最大连接数。(默认值:10)
      connectionLimit: 10,
      // 排队链接请求的限制数，0表示不限制
      queueLimit: 0,
    })

    client = drizzle(poolConnection, {
      schema,
      mode: "default",
    })

    return client
  }

  return client
}
