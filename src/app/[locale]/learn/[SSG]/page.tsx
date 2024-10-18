import styles from "./index.module.scss"
export const revalidate = 10

export function generateStaticParams() {
  return [1, 2, 3].map((SSG) => {
    SSG
  })
}

export default async function Home({ params }: { params: { SSG: string } }) {
  return (
    <div className={styles.container}>
      <div style={{ color: "red" }}>{params.SSG}</div>
      <div>{Date.now()}</div>
    </div>
  )
}
