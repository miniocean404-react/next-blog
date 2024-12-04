import { allDocs } from "contentlayer/generated"
import { Mdx } from "~/content/components"
import { useLiveReload } from "next-contentlayer2/hooks"

export default function Demo() {
  return (
    <div className="mt-16 mx-auto max-w-mini-layout ">
      <ul>
        {allDocs.map((doc) => {
          return <Mdx key={doc._id} code={doc.body.code}></Mdx>
        })}
      </ul>
    </div>
  )
}
