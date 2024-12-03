import Code from "~/lib/components/mini/code"
import Mdx from "./index.mdx"

export default function Demo() {
  return (
    <div className="mt-16">
      <Code code={` console.log("Hello World")`}></Code>
      <Mdx></Mdx>
    </div>
  )
}
