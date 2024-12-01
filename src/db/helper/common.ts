import { bigint, boolean, int, timestamp, varchar } from "drizzle-orm/mysql-core"

export const operators = {
  // 数据行备注
  comments: varchar("comments", { length: 255 }),
  // 创建者
  creator: bigint("creator", { mode: "number" }),
  // 更新人
  operator: bigint("operator", { mode: "number" }),
  // 1:删除 0:不删除
  delFlag: boolean("del_flag").default(false),
}

export const timestamps = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).onUpdateNow(),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
}
