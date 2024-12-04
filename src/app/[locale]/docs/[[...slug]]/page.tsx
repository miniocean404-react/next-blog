import { cn } from "@/utils/tw"
import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Mdx } from "~/content/components"
import { docsConfig } from "~/content/config"
import { DocsSidebarNav, DocsSidebarNavItems } from "~/content/ui/sidebar"
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
    <div
      className={cn(
        "w-full mt-24 mx-auto py-6 grid px-8",
        "lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-10",
        "md:grid-cols-[220px_minmax(0,1fr)_300px] md:gap-6",
      )}
    >
      <aside>
        <DocsSidebarNav config={docsConfig}></DocsSidebarNav>
      </aside>

      <main className="overflow-auto">
        <Mdx key={doc._id} code={doc.body.code}></Mdx>
      </main>

      <div>
        <DashboardTableOfContents toc={toc}></DashboardTableOfContents>
      </div>
    </div>
  )
}
