"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "~/lib/utils"
import { CopyButton } from "@/components/mdx/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/lib/components/shadcn/ui/tabs"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[]
  // todo 暂时[0]获取
  const Code = Codes[0]

  const Preview = React.useMemo(() => {
    // todo 获取组件
    const Component = "" as any

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  const codeString = React.useMemo(() => {
    // @ts-ignore
    if (typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined") {
      // @ts-ignore
      const [Button] = React.Children.toArray(Code.props.children) as React.ReactElement[]
      // @ts-ignore
      return Button?.props?.value || Button?.props?.__code__ || null
    }
  }, [Code])

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
        <Image
          src={`/images/blocks/${name}.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
        />
        <Image
          src={`/images/blocks/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
        />
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/blocks/new-york/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2", className)} {...props}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>

        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <CopyButton
                value={codeString}
                variant="outline"
                className="text-foreground hover:bg-muted hover:text-foreground h-7 w-7 opacity-100 [&_svg]:h-3.5 [&_svg]:w-3.5"
              />
            </div>
          </div>

          <div
            className={cn("preview flex min-h-[350px] w-full justify-center p-10", {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            })}
          >
            <React.Suspense
              fallback={
                <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
                  {/* 图标 */}
                  {/* <Icons.spinner className="animate-spin mr-2 h-4 w-4" /> */}
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
