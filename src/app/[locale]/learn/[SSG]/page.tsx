export const revalidate = 10;

export function generateStaticParams() {
  return [1, 2, 3].map((SSG) => {
    SSG;
  });
}

export default async function Home({ params }: { params: { SSG: string } }) {
  return (
    <div>
      <div style={{ color: "red" }}>{params.SSG}</div>
      <div>{Date.now()}</div>
    </div>
  );
}
