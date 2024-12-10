import { visit } from "unist-util-visit"
import type { UnistNode, UnistTree } from "~/lib/mdx/types/node"

export function rehypeNpmCommand() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return
      }

      // npm install.
      if (node.properties?.["__code__"]?.startsWith("npm install")) {
        const npmCommand = node.properties?.["__code__"]
        node.properties["__npm_command__"] = npmCommand
        node.properties["__yarn_command__"] = npmCommand.replace("npm install", "yarn add")
        node.properties["__pnpm_command__"] = npmCommand.replace("npm install", "pnpm add")
        node.properties["__bun_command__"] = npmCommand.replace("npm install", "bun add")
      }

      // npx create.
      if (node.properties?.["__code__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__code__"]
        node.properties["__npm_command__"] = npmCommand
        node.properties["__yarn_command__"] = npmCommand.replace("npx create-", "yarn create ")
        node.properties["__pnpm_command__"] = npmCommand.replace("npx create-", "pnpm create ")
        node.properties["__bun_command__"] = npmCommand.replace("npx", "bunx --bun")
      }

      // npx.
      if (
        node.properties?.["__code__"]?.startsWith("npx") &&
        !node.properties?.["__code__"]?.startsWith("npx create-")
      ) {
        const npmCommand = node.properties?.["__code__"]
        node.properties["__npm_command__"] = npmCommand
        node.properties["__yarn_command__"] = npmCommand
        node.properties["__pnpm_command__"] = npmCommand.replace("npx", "pnpm dlx")
        node.properties["__bun_command__"] = npmCommand.replace("npx", "bunx --bun")
      }
    })
  }
}
