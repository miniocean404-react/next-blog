import { operators, timestamps } from "@/db/helper/common"
import {
  bigint,
  datetime,
  index,
  int,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core"

// User 表
export const userModel = mysqlTable(
  "user",
  {
    id: serial("id").primaryKey().autoincrement(),
    cuid: varchar("cuid", { length: 255 }).notNull().unique().$defaultFn(crypto.randomUUID),
    account: varchar("account", { length: 32 }),
    nickname: varchar("nickname", { length: 32 }),
    email: varchar("email", { length: 64 }).notNull().unique(),
    // 邮箱确认时间, mode 为 string 则为时区时间，是正确的本地时间
    emailVerified: datetime("email_verified", { mode: "string" }),
    password: varchar("password", { length: 255 }),
    realPassword: varchar("real_password", { length: 32 }),
    mobile: varchar("mobile", { length: 32 }),
    realName: varchar("real_name", { length: 32 }),
    gender: int("gender").default(2),
    // '0'禁用，'1' 启用, '2' 密码过期或初次未修改
    status: int("status").default(1),
    // 头像
    avatar: varchar("avatar", { length: 255 }),
    country: varchar("country", { length: 32 }),
    province: varchar("province", { length: 32 }),
    city: varchar("city", { length: 32 }),
    area: varchar("area", { length: 32 }),
    street: varchar("street", { length: 255 }),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      emailIndex: index("user_email_idx").on(table.email),
      realNameIndex: index("user_real_name_idx").on(table.realName),
      mobileIndex: index("user_mobile_idx").on(table.mobile),
    }
  },
)

// Role 表
export const roleModel = mysqlTable(
  "role",
  {
    id: serial("id").primaryKey().autoincrement(),
    // 父id
    parentId: int("parent_id").default(0),
    // 角色名称
    roleName: varchar("role_name", { length: 40 }),
    // 角色标识
    roleKey: varchar("role_key", { length: 32 }).unique(),
    roleLevel: int("role_level"),
    // 1有效，0禁用
    roleStatus: int("role_status").default(1),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      roleKeyUnique: uniqueIndex("role_role_key_idx").on(table.roleKey),
      roleNameIndex: index("role_role_name_idx").on(table.roleName),
    }
  },
)

// UserRole 表
export const userRoleModel = mysqlTable(
  "user_role",
  {
    id: serial("id").primaryKey().autoincrement(),
    userId: bigint("user_id", { mode: "number" }).notNull(),
    roleId: bigint("role_id", { mode: "number" }).notNull(),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      roleIdIndex: index("user_role_role_id_idx").on(table.roleId),
      userIdIndex: index("user_role_user_id_idx").on(table.userId),
    }
  },
)
