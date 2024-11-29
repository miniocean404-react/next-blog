import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/model/index.ts",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    // host: process.env.MYSQL_HOST,
    // port: Number(process.env.MYSQL_POST),
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,

    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: '123456',
    // database: 'knowledge',
  },
  verbose: true,
  strict: false,
})
