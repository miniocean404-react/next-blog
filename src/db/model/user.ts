import {
  bigint,
  datetime,
  index,
  int,
  mysqlTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core"
import { nanoid } from "nanoid"

// User 表
export const User = mysqlTable(
  "user",
  {
    id: serial("id").primaryKey().autoincrement(),
    cuid: varchar("cuid", { length: 255 }).notNull().unique().$defaultFn(nanoid),
    account: varchar("account", { length: 32 }),
    nickname: varchar("nickname", { length: 32 }),
    email: varchar("email", { length: 64 }).notNull().unique(),
    // 邮箱确认时间
    emailVerified: datetime("email_verified"),
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
    // 备注
    comments: varchar("comments", { length: 255 }),
    creator: bigint("creator", { mode: "number" }),
    operator: bigint("operator", { mode: "number" }),
    // 1:删除 0:不删除
    delFlag: int("del_flag").default(0),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at"),
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
export const Role = mysqlTable(
  "role",
  {
    id: serial("id").primaryKey().autoincrement(),
    // 父id
    parentId: serial("parent_id").default(0),
    // 角色名称
    roleName: varchar("role_name", { length: 40 }),
    // 角色标识
    roleKey: varchar("role_key", { length: 32 }).unique(),
    roleLevel: int("role_level"),
    // 1有效，0禁用
    roleStatus: int("role_status").default(1),
    // 描述
    comments: varchar("comments", { length: 255 }),
    // 创建者
    creator: bigint("creator", { mode: "number" }),
    // 更新人
    operator: bigint("operator", { mode: "number" }),
    delFlag: int("del_flag").default(0),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      roleKeyUnique: uniqueIndex("role_role_key_idx").on(table.roleKey),
      roleNameIndex: index("role_role_name_idx").on(table.roleName),
    }
  },
)

// UserRole 表
export const UserRole = mysqlTable(
  "user_role",
  {
    id: serial("id").primaryKey().autoincrement(),
    userId: serial("user_id").notNull(),
    roleId: serial("role_id").notNull(),
    // 创建者
    creator: bigint("creator", { mode: "number" }),
    // 更新人
    operator: bigint("operator", { mode: "number" }),
    delFlag: int("del_flag").default(0),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      roleIdIndex: index("user_role_role_id_idx").on(table.roleId),
      userIdIndex: index("user_role_user_id_idx").on(table.userId),
    }
  },
)
