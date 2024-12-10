import type { Node, Data } from "unist"

export interface UnistNode extends Node {
  type: string
  data?: UnistData

  name?: string
  tagName?: string
  value?: string
  properties?: {
    __code__?: string
    __className__?: string
    __event__?: string
    [key: string]: unknown
  } & NpmCommands
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
  children?: UnistNode[]
}

interface UnistData extends Data {
  meta: string
}

export interface UnistTree extends UnistNode {
  children: UnistNode[]
}

export interface NpmCommands {
  __npm_command__?: string
  __yarn_command__?: string
  __pnpm_command__?: string
  __bun_command__?: string
}
