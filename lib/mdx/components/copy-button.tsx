"use client"

import type { DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { z } from "zod"
import { Button, type ButtonProps } from "~/lib/components/shadcn/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/lib/components/shadcn/ui/dropdown-menu"
import type { NpmCommands } from "~/lib/mdx/types/node"
import { cn } from "~/lib/utils"

const eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_usage_import_code",
    "copy_usage_code",
    "copy_primitive_code",
    "copy_theme_code",
    "copy_block_code",
    "copy_chunk_code",
    "enable_lift_mode",
    "copy_chart_code",
    "copy_chart_theme",
    "copy_chart_data",
    "copy_color",
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
})

export type Event = z.infer<typeof eventSchema>

interface CopyButtonProps extends ButtonProps {
  value: string
  src?: string
  event?: Event["name"]
}

export function CopyButton({
  value,
  className,
  src,
  variant = "ghost",
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className,
      )}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined,
        )
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<NpmCommands>
}

export function CopyNpmCommandButton({ commands, className, ...props }: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyCommand = useCallback((value: string, pm: "npm" | "pnpm" | "yarn" | "bun") => {
    copyToClipboardWithMeta(value, {
      name: "copy_npm_command",
      properties: {
        command: value,
        pm,
      },
    })
    setHasCopied(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
            className,
          )}
        >
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyCommand(commands.__npm_command__, "npm")}>
          npm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__yarn_command__, "yarn")}>
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__pnpm_command__, "pnpm")}>
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__bun_command__, "bun")}>
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
}
