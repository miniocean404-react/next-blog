// markdown 语法树遍历
import { visit } from "unist-util-visit"
import type { UnistNode } from "~/lib/mdx/node"

export function rehypeGetCode() {
  return (tree: UnistNode) => {
    visit(tree, (node) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        if (!node.children) return

        const [codeEl] = node.children

        if (codeEl.tagName !== "code") return

        if (codeEl.data?.meta) {
          // 从 meta 中提取事件并将其传递到树中。
          const regex = /event="([^"]*)"/
          const match = codeEl.data?.meta.match(regex)
          if (match && node.properties) {
            node.properties.__event__ = match ? match[1] : undefined
            codeEl.data.meta = codeEl.data.meta.replace(regex, "")
          }
        }

        if (node.properties) {
          node.properties["__code__"] = codeEl.children?.[0].value
          node.properties["__src__"] = node.properties?.__src__
          node.properties["__style__"] = node.properties?.__style__
        }
      }
    })
  }
}

export function rehypeSetParentProp() {
  return (tree: UnistNode) => {
    visit(tree, (node) => {
      if (node.properties && node.children && node?.type === "element") {
        if (!("data-rehype-pretty-code-figure" in node.properties)) return

        const preElement = node.children.at(-1)

        if (!preElement || preElement?.tagName !== "pre" || !preElement.properties) return

        preElement.properties["__withMeta__"] = node.children.at(0)?.tagName === "div"
        preElement.properties["__code__"] = node.properties.__code__

        if (node.properties.__src__) {
          preElement.properties["__src__"] = node.properties.__src__
        }

        if (node.properties.__style__) {
          preElement.properties["__style__"] = node.properties.__style__
        }

        if (node.properties.__event__) {
          preElement.properties["__event__"] = node.properties.__event__
        }
      }
    })
  }
}
