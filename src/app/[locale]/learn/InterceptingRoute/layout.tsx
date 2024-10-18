export default async function SSGLayout({ children, intercepting }: { children: React.ReactNode; intercepting: React.ReactNode; params: { locale: string } }) {
  return (
    <div>
      {children}
      {intercepting}
    </div>
  )
}
