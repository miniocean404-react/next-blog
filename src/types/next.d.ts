interface PagePropsWith<P extends object = any, S extends any = any> {
  params: Promise<P>
  searchParams?: Promise<S>
}

interface LayoutPropsWith<P extends object = any> {
  children: React.ReactNode
  params: Promise<P>
}
