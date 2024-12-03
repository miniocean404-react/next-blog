import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"

// 一款基于 TextMate 语法高亮
import { createHighlighter } from "shiki"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
// 使用文件路径及行号添加代码块
import { codeImport } from "remark-code-import"
// 为 html 标题添加连接
import rehypeAutolinkHeadings from "rehype-autolink-headings"
// 为 html 标题添加 id
import rehypeSlug from "rehype-slug"
// 支持 GFM 的备注插件（自动链接文字、脚注、删除线、表格、任务列表）。
import remarkGfm from "remark-gfm"
// markdown 语法树遍历
import { visit } from "unist-util-visit"

// import { rehypeComponent } from "./lib/rehype-component"
import { rehypeNpmCommand } from "./plugin/rehype-npm-command"

const prettyCodeOptions: Options = {
  theme: "one-dark-pro",
  getHighlighter: (options) => createHighlighter(options),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) node.properties.className = []
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) node.properties.className = []
    node.properties.className = ["word--highlighted"]
  },
}

const documents = defineCollection({
  name: "Doc",
  directory: "./mdx",
  include: "**/*.mdx",
  schema: (z) => ({
    // title: z.string(),
    // description: z.string(),
    // published: z.boolean().default(true),
    // date: z.string().optional(),
    // links: z
    //   .object({
    //     doc: z.string().optional(),
    //     api: z.string().optional(),
    //   })
    //   .optional(),
    // featured: z.boolean().optional().default(false),
    // component: z.boolean().optional().default(false),
    // toc: z.boolean().optional().default(true),
    // image: z.string().optional(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm],
      rehypePlugins: [
        [rehypePrettyCode, prettyCodeOptions],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
        // rehypeComponent,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children
              if (codeEl.tagName !== "code") {
                return
              }
              if (codeEl.data?.meta) {
                // Extract event from meta and pass it down the tree.
                const regex = /event="([^"]*)"/
                const match = codeEl.data?.meta.match(regex)
                if (match) {
                  node.__event__ = match ? match[1] : null
                  codeEl.data.meta = codeEl.data.meta.replace(regex, "")
                }
              }

              // node.__rawString__ = codeEl.children?.[0].value
              node.__src__ = node.properties?.__src__
              node.__style__ = node.properties?.__style__
            }
          })
        },
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) {
                return
              }

              const preElement = node.children.at(-1)
              if (preElement.tagName !== "pre") {
                return
              }

              preElement.properties["__withMeta__"] = node.children.at(0).tagName === "div"
              // preElement.properties["__rawString__"] = node.__rawString__

              if (node.__src__) {
                preElement.properties["__src__"] = node.__src__
              }

              if (node.__event__) {
                preElement.properties["__event__"] = node.__event__
              }

              if (node.__style__) {
                preElement.properties["__style__"] = node.__style__
              }
            }
          })
        },
        // rehypeNpmCommand,
      ],
    })
    return {
      ...document,
      // image: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURI(document.title)}`,
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path.split("/").slice(1).join("/"),
      body: {
        raw: document.content,
        code: body,
      },
    }
  },
})

export default defineConfig({
  collections: [documents],
})
