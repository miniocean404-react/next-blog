import { type PropsWithChildren } from "react"
import { cn } from "@/utils/tw"
import SiderMask from "~/lib/components/mini/sider-mask"
import Image from "next/image"

export default function FrameworkIcon() {
  const LINE_TOTAL = 14

  const icons = [
    [
      {
        url: "/svg/android.svg",
        alt: "android",
        color: "#34A853",
      },
      {
        url: "/svg/kotlin.svg",
        alt: "kotlin",
        color: "#7F52FF",
      },
      {
        url: "/svg/javascript.svg",
        alt: "javascript",
        color: "#F7DF1E",
      },
      {
        url: "/svg/typescript.svg",
        alt: "typescript",
        color: "#3178C6",
      },
      {
        url: "/svg/css3.svg",
        alt: "css3",
        color: "#1572B6",
      },

      {
        url: "/svg/nodejs.svg",
        alt: "nodejs",
        color: "#5FA04E",
      },
      {
        url: "/svg/bun.svg",
        alt: "bun",
        color: "#fcbbd0",
      },
      {
        url: "/svg/wasm.svg",
        alt: "wasm",
        color: "#6f4bee",
      },
      {
        url: "/svg/rust.svg",
        alt: "rust",
        color: "#fed585",
      },
      {
        url: "/svg/go.svg",
        alt: "go",
        color: "#00ADD8",
      },

      {
        url: "/svg/dart.svg",
        alt: "flutter",
        color: "#0175C2",
      },
      {
        url: "/svg/mysql.svg",
        alt: "mysql",
        color: "#4479A1",
      },
    ],
    [
      {
        url: "/svg/react-query.svg",
        alt: "react-query",
        color: "#FF4154",
      },
      {
        url: "/svg/nest.svg",
        alt: "rollup",
        color: "#E0234E",
      },
      {
        url: "/svg/drizzle.svg",
        alt: "drizzle",
        color: "#4faf52",
      },
      {
        url: "/svg/react.svg",
        alt: "react",
        color: "#61DAFB",
      },
      {
        url: "/svg/next.svg",
        alt: "next",
        color: "#fed585",
      },
      {
        url: "/svg/vue.svg",
        alt: "vue",
        color: "#4FC08D",
      },
      {
        url: "/svg/webpack.svg",
        alt: "webpack",
        color: "#8DD6F9",
      },
      {
        url: "/svg/vite.svg",
        alt: "vite",
        color: "#646CFF",
      },
      {
        url: "/svg/rollup.svg",
        alt: "rollup",
        color: "#EC4A3F",
      },
      {
        url: "/svg/esbuild.svg",
        alt: "esbuild",
        color: "#FFCF00",
      },
      {
        url: "/svg/tailwindcss.svg",
        alt: "rollup",
        color: "#06B6D4",
      },
    ],
    [
      {
        url: "/svg/github.svg",
        alt: "github",
        color: "#abf728",
      },
      {
        url: "/svg/gitlab.svg",
        alt: "gitlab",
        color: "#FC6D26",
      },
      {
        url: "/svg/git.svg",
        alt: "git",
        color: "#F05032",
      },
      {
        url: "/svg/npm.svg",
        alt: "npm",
        color: "#CB3837",
      },
      {
        url: "/svg/pnpm.svg",
        alt: "pnpm",
        color: "#f9ad00",
      },
      {
        url: "/svg/vscode.svg",
        alt: "vscode",
        color: "#4c98d3",
      },
      {
        url: "/svg/webstorm.svg",
        alt: "webstorm",
        color: "#387afc",
      },
      {
        url: "/svg/chrome.svg",
        alt: "fig",
        color: "#4285F4",
      },
      {
        url: "/svg/figma.svg",
        alt: "figma",
        color: "#F24E1E",
      },
      {
        url: "/svg/linux.svg",
        alt: "linux",
        color: "#e9d74a",
      },
      {
        url: "/svg/fig.svg",
        alt: "fig",
        color: "#412ff9",
      },

      {
        url: "/svg/docker.svg",
        alt: "docker",
        color: "#2496ED",
      },
      {
        url: "/svg/reqable.svg",
        alt: "reqable",
        color: "#f7b43c",
      },
    ],
    [
      {
        url: "/svg/mini-program.svg",
        alt: "mini-program",
        color: "#1fc162",
      },
      {
        url: "/svg/taro.svg",
        alt: "taro",
        color: "#3d79fb",
      },
      {
        url: "/svg/uni-app.svg",
        alt: "uni-app",
        color: "#2b9938",
      },
      {
        url: "/svg/electron.svg",
        alt: "electron",
        color: "#A2ECFB",
      },
      {
        url: "/svg/tauri.svg",
        alt: "tauri",
        color: "#FFC131",
      },
      {
        url: "/svg/flutter.svg",
        alt: "flutter",
        color: "#02569B",
      },
    ],
    [
      {
        url: "/svg/chatgpt.svg",
        alt: "chatgpt",
        color: "#398038",
      },
      {
        url: "/svg/github-copilot.svg",
        alt: "github-copilot",
        color: "#8000de",
      },
    ],
  ]

  return (
    <section className="py-14">
      <h2 className="relative z-mini-title mx-auto block w-max text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        我的技术栈
      </h2>

      <div
        className={cn("relative z-mini-bg -mt-5 flex flex-col items-center overflow-hidden")}
        key={"framework"}
      >
        <SiderMask top bottom left right></SiderMask>

        <div className="relative mb-3 grid translate-x-9 grid-flow-col gap-2.5 md:gap-4 lg:gap-6">
          {new Array(LINE_TOTAL).fill(null).map((item, index) => {
            return <FrameworkIconElement key={`${index}-1`} />
          })}
        </div>

        {icons.map((iconGroup, index) => {
          return (
            <div
              className={cn("mb-3 grid grid-flow-col gap-2.5 md:gap-4 lg:gap-6", {
                "translate-x-0": index % 2 === 0,
                "translate-x-9": index % 2 === 1,
              })}
            >
              {new Array(Math.ceil((LINE_TOTAL - iconGroup.length) / 2))
                .fill(null)
                .map((_, index) => {
                  return <FrameworkIconElement key={`${index}-placeholder-1`} />
                })}

              {iconGroup.map((icon) => {
                return (
                  <FrameworkIconElement
                    key={icon.url}
                    style={{ "--framework-icon": `${icon.color}` }}
                  >
                    <Image
                      className="h-1/2"
                      src={icon.url}
                      alt={icon.alt}
                      width={48}
                      height={48}
                      priority
                    />
                  </FrameworkIconElement>
                )
              })}

              {new Array(Math.ceil((LINE_TOTAL - iconGroup.length) / 2))
                .fill(null)
                .map((item, index) => {
                  return <FrameworkIconElement key={`${index}-placeholder-2`} />
                })}
            </div>
          )
        })}

        <div className="mb-3 grid translate-x-9 grid-flow-col gap-2.5 md:gap-4 lg:gap-6">
          {new Array(LINE_TOTAL).fill(null).map((item, index) => {
            return <FrameworkIconElement key={`${index}-2`} />
          })}
        </div>
      </div>
    </section>
  )
}

function FrameworkIconElement({
  children,
  className,
  style,
}: PropsWithChildren<FrameworkIconElementProps>) {
  return (
    <a
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-xl border bg-mini-background-soft",
        "size-14 md:size-20 lg:size-24",
        {
          "before:absolute before:inset-[10%] before:-z-10 before:bg-[var(--framework-icon)] before:blur-xl before:duration-1000":
            children,
        },
        { "before:opacity-0 before:transition-opacity before:will-change-[opacity]": children },
        { "hover:before:opacity-100 hover:before:duration-200": children },

        { "scale-100 transition-transform will-change-[scale]": !children },
        { "hover:scale-90 hover:duration-200": !children },
        className,
      )}
      style={style}
    >
      {children}
    </a>
  )
}
