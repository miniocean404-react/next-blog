import { allDocs } from "content-collections"
import { useMDXComponent } from "@content-collections/mdx/react"
import { components } from "~/content/components"

import "@/css/mdx.css"

export default function Demo() {
  return (
    <div className="mt-16 mx-auto max-w-mini-layout">
      <ul>
        {allDocs.map((doc) => {
          const Component = useMDXComponent(doc.body.code)

          return (
            <li key={doc._meta.path}>
              <Component components={components}></Component>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
