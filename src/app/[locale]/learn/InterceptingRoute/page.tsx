import Link from "next/link"
import type { Metadata } from "next"
import { useLocale } from "next-intl"

export const metadata: Metadata = {
  title: "拦截路由",
}

// https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
export default function Home(props: { locale: string }) {
  return (
    <div>
      {/* 软导航直接导航到 demo/1*/}
      {/* 硬导航会被 (.)demo 拦截 */}
      <Link href={"/zh/learn/InterceptingRoute/demo/1"}>软导航</Link>
    </div>
  )
}
