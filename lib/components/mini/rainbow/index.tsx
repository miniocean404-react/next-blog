import { cn } from "~/lib/utils"

export default function RainbowBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "z-mini-rainbow pointer-events-none absolute top-0 h-24 w-full blur-3xl before:absolute before:top-0 before:-bottom-1/5 before:left-2/4 before:z-0 before:h-3/5 before:w-full before:-translate-x-1/2 before:translate-y-0 before:scale-x-100 before:scale-y-100 before:rotate-0 before:skew-x-0 before:skew-y-0 before:animate-[rainbow_var(--speed,_2s)_infinite_linear] before:bg-[linear-gradient(90deg,_#ff4242,_#a1ff42,_#42a1ff,_#42d0ff,_#a142ff)] before:[background-size:200%] before:opacity-20 before:filter before:content-['']",
        className,
      )}
    ></div>
  )
}
