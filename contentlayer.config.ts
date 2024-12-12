import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files"
import readingTime from "reading-time"
import { extractTocHeadings } from "pliny/mdx-plugins/index.js"
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js"

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

// remark：
// remark-math 支持数学公式
// remark-img-to-jsx 将本地文件使用 Nextjs 的 Image 组件进行替换
// remark-github-blockquote-alerts 支持在 markdown 中使用 github 风格的 alert
// rehype：
// rehype-katex: 使用katex渲染数学公式
// rehype-preset-minify：压缩html

// 一款基于 TextMate 语法高亮
import { createHighlighter as getHighlighter } from "shiki"

// import { rehypeComponent } from "./lib/rehype-component"
import { rehypeNpmCommand } from "./lib/mdx/rehype-npm-command"
import { rehypeGetCode, rehypeSetParentProp } from "~/lib/mdx/rehype-code"
import fs from "fs"
import path from "path"

const DOC_PATH = "docs"

const prettyCodeOptions: Options = {
  theme: "github-dark",
  getHighlighter,
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
  computedFields: {
    router: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    routerSep: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    fullRouter: {
      type: "string",
      resolve: (doc) => `${DOC_PATH}/${doc._raw.flattenedPath.split("/").slice(1).join("/")}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    createdAt: {
      type: "date",
      resolve: (doc) => {
        const stats = fs.statSync(path.join(DOC_PATH, doc._raw.sourceFilePath))
        return stats.birthtime
      },
    },
    updatedAt: {
      type: "date",
      resolve: (doc) => {
        const stats = fs.statSync(path.join(DOC_PATH, doc._raw.sourceFilePath))
        return stats.mtime
      },
    },
    toc: {
      type: "string",
      resolve: async (doc) => await extractTocHeadings(doc.body.raw),
    },
  },
}))

export default makeSource({
  contentDirPath: DOC_PATH,
  documentTypes: [Doc],
  // 生成文章内容的索引以供搜索使用
  onSuccess: async (importData) => {
    const { allDocs, allDocuments } = await importData()
    // allDocuments.map((doc) => {
    // console.log(doc._raw.flattenedPath)
    // })

    // 创建排序索引
    // allCoreContent(sortPosts(allDocuments))
  },
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      // rehypeComponent,
      rehypeGetCode,
      [rehypePrettyCode, prettyCodeOptions],
      rehypeSetParentProp,
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

// function generateFileTree() {
//   const tree = directoryTree(
//     DOC_PATH,
//     { attributes: ["extension", "type"], normalizePath: true },
//     (item, path, stats) => {
//       item.custom = {
//         title: item.name.replace(item.extension || "", ""),
//         path: item.path.replace(DOC_PATH, "").replace(item.extension || "", ""),
//       }
//     },
//     (item, path, stats) => {
//       // item.custom[""]
//       item.custom = {
//         title: item.name.replace(item.extension || "", ""),
//       }
//     },
//   )

//   fs.writeFileSync("src/components/mdx/siderbar.json", JSON.stringify(tree, null, 2))
// }
