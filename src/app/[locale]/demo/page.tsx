import Code from "~/lib/components/mini/code"
import Mdx from "./index.mdx"
import { allDocs } from "content-collections"

export default function Demo() {
  return (
    <div className="mt-16">
      <Code code={` console.log("Hello World")`}></Code>
      {/* <Mdx></Mdx> */}

      <ul>
        {allDocs.map((post) => (
          <li key={post._meta.path}>
            <a href={`/content/${post._meta.path}`}>aaaa</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
