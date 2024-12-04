import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Mdx } from "~/lib/mdx/components/skeleton"
import { DashboardTableOfContents } from "~/lib/mdx/components/toc"
import { getTableOfContents } from "~/lib/mdx/components/toc/toc"

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
      <main className=" py-8 no-scrollbar">
        <Mdx key={doc._id} code={doc.body.code}></Mdx>
      </main>

      <div className="sticky top-16 h-mini-layout-one-screen py-8 text-sm overflow-auto no-scrollbar">
        <DashboardTableOfContents toc={toc}></DashboardTableOfContents>
      </div>
    </>
  )
}
