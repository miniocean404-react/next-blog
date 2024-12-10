type preElementProps = React.HTMLAttributes<HTMLPreElement> & {
  __style__?: Style["name"]
  __code__?: string
  __withMeta__?: boolean
  __src__?: string
} & NpmCommands
