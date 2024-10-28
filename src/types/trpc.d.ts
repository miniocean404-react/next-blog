// 过程元数据，允许添加可选的过程特定 meta 属性，该属性将在所有中间件函数参数中可用
// 一般用于，身份校验，角色区分等
interface Meta {
  authRequired?: boolean // 是否需要身份验证
  role?: "normal" | "user" | "admin" // 用户角色区分
}

interface UserType {
  id: number
  name: string
  age: number
  role: string
}
