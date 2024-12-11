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
import type { NpmCommands } from "~/lib/mdx/node"
import { cn } from "~/lib/utils"

interface CopyButtonProps extends ButtonProps {
  value: string
  src?: string
}

export function CopyButton({
  value,
  className,
  src,
  variant = "ghost",
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
        copyToClipboardWithMeta(value)
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

  const copyCommand = useCallback((value: string) => {
    copyToClipboardWithMeta(value)
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
        <DropdownMenuItem onClick={() => copyCommand(commands.__npm_command__)}>
          npm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__yarn_command__)}>
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__pnpm_command__)}>
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCommand(commands.__bun_command__)}>
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
}
