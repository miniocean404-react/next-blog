import {
  index,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core"

export const Account = mysqlTable(
  "account",
  {
    id: serial("id").primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 64 }).notNull(),
    type: varchar("type", { length: 32 }).notNull(),
    provider: varchar("provider", { length: 32 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 32 }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: varchar("token_type", { length: 32 }),
    scope: varchar("scope", { length: 32 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 32 }),
    refreshTokenExpiresIn: int("refresh_token_expires_in"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      providerAccountIndex: uniqueIndex("account_provider_provider_account_id_idx").on(
        table.provider,
        table.providerAccountId,
      ),
      userIdIndex: index("account_user_id_idx").on(table.userId),
    }
  },
)
