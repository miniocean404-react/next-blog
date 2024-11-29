import {
  bigint,
  boolean,
  index,
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

// Permission 表
export const Permission = mysqlTable(
  "permission",
  {
    id: serial("id").primaryKey().autoincrement(),
    // 父级ID
    parentId: bigint("parent_id", { mode: "number" }),
    // 资源名称
    resourceName: varchar("resource_name", { length: 40 }),
    // 资源标识
    resourceKey: varchar("resource_key", { length: 100 }),
    // 资源类型 1、模块 2、菜单 3、按钮 4、链接
    resourceType: varchar("resource_type", { length: 1 }),
    // 资源图标
    resourceIcon: varchar("resource_icon", { length: 255 }),
    // 资源路径
    resourcePath: varchar("resource_path", { length: 255 }),
    // 资料链接
    resourceUrl: varchar("resource_url", { length: 255 }),
    // 资源级别
    resourceLevel: int("resource_level"),
    // 是否显示
    resourceShow: boolean("resource_show"),
    // 是否缓存
    resourceCache: boolean("resource_cache"),
    // 资源页面名称
    resourcePageName: varchar("resource_page_name", { length: 32 }),
    // '1有效，0禁用'
    resourceStatus: int("resource_status").default(1),
    comments: varchar("comments", { length: 255 }),
    // '备注'
    creator: bigint("creator", { mode: "number" }),
    operator: bigint("operator", { mode: "number" }),
    delFlag: int("del_flag").default(0),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      resourceNameIndex: index("permission_resource_name_idx").on(table.resourceName),
      parentIdIndex: index("permission_parent_id_idx").on(table.parentId),
    }
  },
)

// RolePermission 表
export const RolePermission = mysqlTable("role_permission", {
  id: serial("id").primaryKey().autoincrement(),
  roleId: bigint("role_id", { mode: "number" }).notNull(),
  permissionId: bigint("permission_id", { mode: "number" }).notNull(),
  creator: bigint("creator", { mode: "number" }),
  operator: bigint("operator", { mode: "number" }),
  delFlag: int("del_flag").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at"),
})
