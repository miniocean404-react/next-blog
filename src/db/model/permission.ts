import { operators, timestamps } from "@/db/helper/common"
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTable,
  serial,
  smallint,
  varchar,
} from "drizzle-orm/mysql-core"

// Permission 表
export const permissionModel = mysqlTable(
  "permission",
  {
    id: serial("id").primaryKey().autoincrement(),
    // 父级ID
    parentId: int("parent_id").default(0),
    // 资源名称
    resourceName: varchar("resource_name", { length: 40 }),
    // 资源标识
    resourceKey: varchar("resource_key", { length: 100 }),
    // 资源类型 1、模块 2、菜单 3、按钮 4、链接
    resourceType: smallint("resource_type", { unsigned: true }),
    // 资源图标
    resourceIcon: varchar("resource_icon", { length: 255 }),
    // 资源路径
    resourcePath: varchar("resource_path", { length: 255 }),
    // 资料链接
    resourceUrl: varchar("resource_url", { length: 255 }),
    // 资源级别
    resourceLevel: smallint("resource_level", { unsigned: true }),
    // 是否显示
    resourceShow: boolean("resource_show"),
    // 是否缓存
    resourceCache: boolean("resource_cache"),
    // 资源页面名称
    resourcePageName: varchar("resource_page_name", { length: 32 }),
    // '1有效，0禁用'
    resourceStatus: boolean("resource_status").default(true),

    ...operators,
    ...timestamps,
  },
  (table) => {
    return {
      resourceNameIndex: index("permission_resource_name_idx").on(table.resourceName),
      parentIdIndex: index("permission_parent_id_idx").on(table.parentId),
    }
  },
)

// RolePermission 表
export const rolePermissionModel = mysqlTable("role_permission", {
  id: serial("id").primaryKey().autoincrement(),
  roleId: bigint("role_id", { mode: "number" }).notNull(),
  permissionId: bigint("permission_id", { mode: "number" }).notNull(),

  ...operators,
  ...timestamps,
})
