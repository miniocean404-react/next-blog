interface PagePropsWith<P extends object = any, S extends any = any> {
  params: Promise<P>
  searchParams?: Promise<S>
}
