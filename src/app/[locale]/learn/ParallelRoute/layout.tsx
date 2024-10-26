export default async function SSGLayout({
  children,
  demo1,
  demo2,
  params: { locale },
}: {
  children: React.ReactNode
  demo1: React.ReactNode
  demo2: React.ReactNode
  params: { locale: string }
}) {
  return (
    <>
      {children}
      {demo1}
      {demo2}
    </>
  )
}
