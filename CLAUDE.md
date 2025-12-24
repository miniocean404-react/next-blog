# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器 (Turbopack, 端口 3000)
pnpm build            # 生产构建
pnpm start            # 启动生产服务器
pnpm lint             # ESLint 检查
pnpm lint:fix         # ESLint 自动修复
pnpm format           # Prettier 格式化

# 数据库 (Drizzle + MySQL)
pnpm db:push          # 推送 schema 到数据库
pnpm db:generate      # 生成迁移文件
pnpm db:web           # 启动 Drizzle Studio

# 内容 (Contentlayer)
pnpm dev:docs         # 开发模式下构建 MDX 文档
pnpm build:docs       # 生产构建 MDX 文档

# 部署
pnpm vercel-publish   # 部署到 Vercel
```

## 项目架构

### 技术栈

- **框架**: Next.js 16 (App Router) + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4.17
- **数据库**: MySQL + Drizzle ORM
- **API**: tRPC
- **认证**: NextAuth v5 (GitHub, Google, Credentials)
- **国际化**: next-intl (中文/英文)
- **内容管理**: Contentlayer2 (MDX)

### 目录结构

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由 (zh/en)
│   │   ├── ai/            # AI 功能页面
│   │   ├── docs/          # MDX 文档页面
│   │   ├── passport/      # 登录/注册
│   │   └── auth/          # 认证相关
│   └── api/               # API 路由
│       └── trpc/          # tRPC 端点
├── components/            # React 组件
├── db/                    # 数据库
│   ├── model/             # Drizzle schema (account, user, permission, token)
│   └── migrations/        # 迁移文件
├── server/                # 服务端代码
│   ├── routers/           # tRPC routers (Demo, Ai, Upload, User)
│   ├── trpc/              # tRPC 配置
│   └── client/            # React Query + tRPC 客户端
├── i18n/                  # 国际化配置
├── utils/                 # 工具函数
│   ├── auth/              # NextAuth 配置
│   ├── hook/              # 自定义 React Hooks
│   ├── gsap/              # GSAP 动画
│   └── schema/            # Zod 验证 schema
└── types/                 # TypeScript 类型定义
content/                   # MDX 文档内容
```

### 路径别名

- `@/*` → `./src/*`
- `~/*` → `./*`
- `contentlayer/generated` → `./.contentlayer/generated`

### 关键配置

- **国际化**: 默认语言 `zh`，支持 `zh`/`en`，使用 `as-needed` 前缀策略
- **MDX**: 使用 Shiki 代码高亮 (github-dark 主题)，支持 GFM、代码导入
- **认证**: JWT 策略，自定义登录页 `/passport/login`

### tRPC 使用

```typescript
// 客户端调用
trpcClient.User.getUserList()
trpcClient.Demo.xxx()
```

### 数据库 Schema

位于 `src/db/model/`，包含: account, user, permission, token
