import { cn } from "@/utils/tw"
import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Mdx } from "~/content/components"
import { DashboardTableOfContents } from "~/content/ui/toc"
import { getTableOfContents } from "~/content/utils/toc"
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
    return notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <>
      <main className="mt-8 overflow-auto no-scrollbar">
        <Mdx key={doc._id} code={doc.body.code}></Mdx>
      </main>

      <div className="mt-8 overflow-auto no-scrollbar">
        <DashboardTableOfContents toc={toc}></DashboardTableOfContents>
      </div>
    </>
  )
}
