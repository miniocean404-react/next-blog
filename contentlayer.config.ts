import {
  defineDocumentType,
  defineNestedType,
  makeSource,
  type ComputedFields,
} from "contentlayer2/source-files"

// 代码块美化
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
// 使用文件路径及行号添加代码块
import { codeImport } from "remark-code-import"
// 为 html 标题自动生成锚点
import rehypeAutolinkHeadings from "rehype-autolink-headings"
// 为 html 标题添加 id
import rehypeSlug from "rehype-slug"
// 拓展markdown的功能，支持 GFM 的备注插件（自动链接文字、脚注、删除线、表格、任务列表，支持表格、等）。
import remarkGfm from "remark-gfm"
// markdown 语法树遍历
import { visit } from "unist-util-visit"

// remark：
// remark-math 支持数学公式
// remark-img-to-jsx 将本地文件使用 Nextjs 的 Image 组件进行替换
// remark-github-blockquote-alerts 支持在 markdown 中使用 github 风格的 alert
// rehype：
// rehype-katex: 使用katex渲染数学公式
// rehype-preset-minify：压缩html

// 一款基于 TextMate 语法高亮
import { createHighlighter } from "shiki"

// import { rehypeComponent } from "./lib/rehype-component"
import { rehypeNpmCommand } from "./lib/mdx/plugin/rehype-npm-command"

const prettyCodeOptions: Options = {
  theme: "one-dark-pro",
  getHighlighter: createHighlighter,
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

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    doc: {
      type: "string",
    },
    api: {
      type: "string",
    },
  },
}))

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  // 基于 makeSource 的 contentDirPath 路径
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    // published: {
    //   type: "boolean",
    //   default: true,
    // },
    links: {
      type: "nested",
      of: LinksProperties,
    },
    // featured: {
    //   type: "boolean",
    //   default: false,
    //   required: false,
    // },
    component: {
      type: "boolean",
      default: false,
      required: false,
    },
    // toc: {
    //   type: "boolean",
    //   default: true,
    //   required: false,
    // },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./docs",
  documentTypes: [Doc],
  // 生成文章内容的索引以供搜索使用
  // onSuccess: async (importData) => {
  //   const { allDocs } = await importData()
  //   await generateTags(allDocs)
  // },
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
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

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
            node.__style__ = node.properties?.__style__
          }
        })
      },
      [rehypePrettyCode, prettyCodeOptions],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== "pre") {
              return
            }

            preElement.properties["__withMeta__"] = node.children.at(0).tagName === "div"
            preElement.properties["__rawString__"] = node.__rawString__

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
      rehypeNpmCommand,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
