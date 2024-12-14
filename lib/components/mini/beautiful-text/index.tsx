import type { PropsWithChildren } from "react"
import { cn } from "~/lib/utils"
import "./index.css"

interface BeautifulTextProps {
  className?: string
  text: string
}

export default function BeautifulText(props: PropsWithChildren<BeautifulTextProps>) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", props.className)}>
      {props.text}

      <div className="aurora pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-1))",
            filter: "blur(1rem)",
            animation:
              "mini-aurora-border 6s ease-in-out infinite, mini-aurora-1 12s ease-in-out infinite alternate",
            mixBlendMode: "overlay",
            top: "-50%",
          }}
          className="absolute h-[60vw] w-[60vw]"
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-2))",
            filter: "blur(1rem)",
            animation:
              "mini-aurora-border 6s ease-in-out infinite, mini-aurora-2 12s ease-in-out infinite alternate",
            mixBlendMode: "overlay",
            right: "0",
            top: "0",
          }}
          className="absolute h-[60vw] w-[60vw]"
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-3))",
            filter: "blur(1rem)",
            animation:
              "mini-aurora-border 6s ease-in-out infinite, mini-aurora-3 12s ease-in-out infinite alternate",
            mixBlendMode: "overlay",
            left: "0",
            bottom: "0",
          }}
          className="absolute h-[60vw] w-[60vw]"
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-4))",
            filter: "blur(1rem)",
            animation:
              "mini-aurora-border 6s ease-in-out infinite, mini-aurora-4 12s ease-in-out infinite alternate",
            mixBlendMode: "overlay",
            right: "0",
            bottom: "-50%",
          }}
          className="absolute h-[60vw] w-[60vw]"
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-5))",
            filter: "blur(1rem)",
            animation:
              "mini-aurora-border 6s ease-in-out infinite, mini-aurora-5 12s ease-in-out infinite alternate",
            mixBlendMode: "overlay",
          }}
          className="absolute h-[60vw] w-[60vw]"
        ></div>
      </div>
    </span>
  )
}
