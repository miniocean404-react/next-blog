import type { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: params.locale,
  }
}

export default function Home({ params }: Props) {
  return <div>111</div>
}
