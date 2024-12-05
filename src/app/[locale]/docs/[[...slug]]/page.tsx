import { allDocs } from "contentlayer/generated"
import type { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Mdx } from "~/lib/mdx/components/skeleton"
import { DashboardTableOfContents } from "~/lib/mdx/components/toc"
import { getTableOfContents } from "~/lib/mdx/components/toc/toc"

// import { useLiveReload } from "next-contentlayer2/hooks"

export async function generateMetadata(
  { params }: DocPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const metadata = await parent
  const doc = await getDocFromParams({ params })
  const t = await getTranslations("app")

  if (!doc) {
    return {}
  }

  return {
    metadataBase: metadata.metadataBase,
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${doc.slug}`,
      images: [
        {
          url: `/favicon-96x96.png`,
          width: 1200,
          height: 630,
          alt: t("appDefaultTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [`/favicon-96x96.png`],
      creator: `@${t("author")}`,
    },
  }
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function Docs({ params }: DocPageProps) {
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

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || ""
  const doc = allDocs.find((doc) => {
    return doc.slugAsParams === slug
  })

  if (!doc) {
    return null
  }

  return doc
}
