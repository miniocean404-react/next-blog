import Code from "~/lib/components/mini/code"
import Index from "./index.mdx"

export default function Demo() {
  return (
    <div className="mt-16">
      <Code code={` console.log("Hello World")`}></Code>
      <Index></Index>
    </div>
  )
}
