import { operators, timestamps } from "@/db/helper/common"
import {
  datetime,
  index,
  int,
  mysqlTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core"

// Token 表
export const tokenModel = mysqlTable(
  "token",
  {
    id: serial("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    hashedKey: varchar("hashed_key", { length: 255 }).notNull().unique(),
    partialKey: varchar("partial_key", { length: 255 }).notNull(),
    expires: datetime("expires", { mode: "string" }),
    lastUsed: datetime("last_used", { mode: "string" }),
    userId: varchar("user_id", { length: 255 }).notNull(),
    // rate limit per minute
    rateLimit: int("rate_limit").default(600),
    // space separated (Eg: "links:write", "domains:read")
    scopes: varchar("scopes", { length: 255 }),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      userIdIndex: index("token_user_id_idx").on(table.userId),
    }
  },
)

// Session 表
export const sessionModel = mysqlTable(
  "session",
  {
    id: serial("id").primaryKey().autoincrement(),
    sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    expires: datetime("expires", { mode: "string" }).notNull(),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      userIdIndex: index("session_user_id_idx").on(table.userId),
    }
  },
)

// VerificationToken 表
export const verificationTokenModel = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expires: datetime("expires", { mode: "string" }).notNull(),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      identifierTokenUnique: uniqueIndex("verification_token_identifier_token_idx").on(
        table.identifier,
        table.token,
      ),
    }
  },
)
