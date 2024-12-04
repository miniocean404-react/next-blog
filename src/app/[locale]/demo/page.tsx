import { cn } from "@/utils/tw"
import { allDocs } from "contentlayer/generated"
import { Mdx } from "~/content/components"
// import { useLiveReload } from "next-contentlayer2/hooks"

export default function Demo() {
  return (
    <div
      className={cn(
        "w-full mt-24 mx-auto py-6 grid px-8",
        "lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-10",
        "md:grid-cols-[220px_minmax(0,1fr)_300px] md:gap-6",
      )}
    >
      <aside></aside>

      <main>
        {allDocs.map((doc) => {
          // console.log(doc.slug)
          // console.log(doc.slugAsParams)

          return <Mdx key={doc._id} code={doc.body.code}></Mdx>
        })}
      </main>

      <div></div>
    </div>
  )
}
