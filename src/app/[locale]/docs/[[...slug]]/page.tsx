import { cn } from "@/utils/tw"
import { allDocs } from "contentlayer/generated"
import { Mdx } from "~/content/components"
// import { useLiveReload } from "next-contentlayer2/hooks"

async function getDocFromParams({ params }: { params: DocsParams }) {
  const slug = params.slug?.join("/") || ""
  const doc = allDocs.find((doc) => {
    return doc.slugAsParams === slug
  })

  if (!doc) {
    return null
  }

  return doc
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function Docs({
  params,
}: {
  params: DocsParams
  searchParams: URLSearchParams
}) {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return null
  }

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
        <Mdx key={doc._id} code={doc.body.code}></Mdx>
      </main>

      <div></div>
    </div>
  )
}
