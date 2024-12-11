import { allDocs } from "contentlayer/generated"
import type { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Mdx } from "~/lib/mdx/components/skeleton"
import { DashboardTableOfContents } from "~/lib/mdx/components/toc"
import { getTableOfContents } from "~/lib/mdx/components/toc/toc"

// import { useLiveReload } from "next-contentlayer2/hooks"

export async function generateMetadata(
  { params }: PagePropsWith<DocPageParams>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const metadata = await parent

  const doc = await getDocFromParams({ params })
  const t = await getTranslations("app")

  if (!doc) return {}

  return {
    metadataBase: metadata.metadataBase,
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: `/${doc.router}`,
      images: metadata.openGraph?.images,
    },
    twitter: {
      card: metadata.twitter?.card || "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: metadata.twitter?.images,
      creator: metadata.twitter?.creator || `@${t("author")}`,
    },
  }
}

export function generateStaticParams() {
  return allDocs.map((doc) => {
    return {
      routerSep: doc.routerSep,
    }
  })
}

export default async function Docs({ params }: PagePropsWith<DocPageParams>) {
  const doc = await getDocFromParams({ params })

  if (!doc) return notFound()

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <>
      <main className="no-scrollbar py-8">
        <Mdx key={doc._id} code={doc.body.code}></Mdx>
      </main>

      <div className="no-scrollbar sticky top-16 hidden h-mini-layout-one-screen overflow-auto py-8 text-sm md:block">
        <DashboardTableOfContents toc={toc}></DashboardTableOfContents>
      </div>
    </>
  )
}

async function getDocFromParams({ params }: PagePropsWith<DocPageParams>) {
  const routerSep = (await params).routerSep

  const doc = allDocs.find((doc) => doc.routerSep === routerSep)

  if (!doc) return null

  return doc
}
