// const components = {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
//   Callout,
//   TechStack,
//   RepoDownload,
//   TemplatePreview,
//   Image,
//   Tweet: ({ id }: { id: string }) => <TweetCard id={id} className="mx-auto" />,
//   ComponentPreview,
//   ComponentSource: (props: any) => <ComponentSource {...props} />,
//   Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
//     <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
//   ),
//   TabsList: ({ className, ...props }: React.ComponentProps<typeof TabsList>) => (
//     <TabsList
//       className={cn("w-full justify-start rounded-none border-b bg-transparent p-0", className)}
//       {...props}
//     />
//   ),
//   TabsTrigger: ({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) => (
//     <TabsTrigger
//       className={cn(
//         "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
//         className,
//       )}
//       {...props}
//     />
//   ),
//   TabsContent: ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => (
//     <TabsContent
//       className={cn(
//         "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
//         className,
//       )}
//       {...props}
//     />
//   ),
//   pre: ({
//     className,
//     __code__,
//     __npm_command__,
//     __pnpm_command__,
//     __yarn_command__,
//     __bun_command__,
//     __withMeta__,
//     __src__,
//     __event__,
//     // __style__,
//     __name__,
//     ...props
//   }: React.HTMLAttributes<HTMLPreElement> & {
//     // __style__?: Style["name"]
//     __code__?: string
//     __npm_command__?: string
//     __pnpm_command__?: string
//     __yarn_command__?: string
//     __bun_command__?: string
//     __withMeta__?: boolean
//     __src__?: string
//     __event__?: Event["name"]
//     __name__?: string
//   }) => {
//     return (
//       <>
//         <pre
//           className={cn(
//             "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
//             className,
//           )}
//           {...props}
//         />
//         {__code__ && __src__ && __event__ && (
//           <CopyButton
//             value={__code__}
//             src={__src__}
//             event={__event__}
//             className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
//           />
//         )}
//         {__npm_command__ && __yarn_command__ && __pnpm_command__ && __bun_command__ && (
//           <CopyNpmCommandButton
//             commands={{
//               __npm_command__,
//               __pnpm_command__,
//               __yarn_command__,
//               __bun_command__,
//             }}
//             className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
//           />
//         )}
//       </>
//     )
//   },
// }
