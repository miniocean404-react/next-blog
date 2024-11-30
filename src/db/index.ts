import { drizzle } from "drizzle-orm/planetscale-serverless"
import * as schema from "./model"

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
})
