import clsx from "clsx"
import styles from "./index.module.scss"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

export default function Marquee({ className, reverse, pauseOnHover = false, children, vertical = false, repeat = 4, ...props }: MarqueeProps) {
  return (
    <div {...props} className={clsx(styles.marquee, className)} style={{ flexDirection: vertical ? "column" : "row" }}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={clsx(styles.group, styles.marqueeHover, { [styles.groupRow]: !vertical, [styles.groupCol]: vertical })}
            style={{ animationDirection: reverse ? "reverse" : "" }}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
