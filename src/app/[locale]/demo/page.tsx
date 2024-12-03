import { allDocs } from "content-collections"
import { useMDXComponent } from "@content-collections/mdx/react"
import { components } from "~/content/components"

import "@/css/mdx.css"

export default function Demo() {
  return (
    <div className="mt-16 mx-auto max-w-mini-layout ">
      <ul>
        {allDocs.map((doc) => {
          const Component = useMDXComponent(doc.body.code)
          return <Component key={doc._meta.path} components={components}></Component>
        })}
      </ul>
    </div>
  )
}
