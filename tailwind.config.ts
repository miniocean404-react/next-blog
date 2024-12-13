import type { Config } from "tailwindcss"

/**
 * ```json
 * padding: {
 *  修改 p-1 是 padding:0.25rem 改为 p-1 是 padding:30px
 *  "1": "30px",
 * },
 * fontSize: {
 *  修改 text-base 改为 font-size: 30px; line-height: 2rem;
 *  base: ["30px", "2rem"],
 * },
 * screens: {
 *  修改媒体查询 768px 尺寸为 300px
 *  md: "300px",
 * },
 * 确保 tailwindcss 一定打包类名到 css 文件中
 * safelist:{
 *  'bg-indigo-600'
 * }
 * blocklist 中的类名不会被打包到样式文件中。比如文章中的文字包含了 container，Tailwind CSS 就会打包 container 类名，但其实没有需要，
 * 或者你自定义了自己的 container 类名，不希望使用 Tailwind CSS 的 container 类名，那此时就可以配置 blocklist
 * blocklist:{
 *  'container',
 * }
 * ```
 */
const config: Config = {
  darkMode: ["class"],
  // 为所有的 tailwindcss 类名添加前缀
  // prefix: "mini",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // mdx 组件需要包含
    // "./lib/mdx/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {},
    extend: {
      fontFamily: {
        sans: ["var(--mini-font-family-base)"],
        mono: ["var(--mini-font-family-mono)"],
      },
      maxWidth: {
        "mini-layout": "var(--mini-layout-max-width)",
      },
      height: {
        "mini-layout-one-screen": "calc(100dvh - 4rem)",
      },
      boxShadow: {
        "mini-1": "var(--mini-shadow-1)",
        "mini-2": "var(--mini-shadow-2)",
        "mini-3": "var(--mini-shadow-3)",
        "mini-4": "var(--mini-shadow-4)",
        "mini-5": "var(--mini-shadow-4)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      zIndex: {
        "mini-bg": "var(--mini-z-index-bg)",
        "mini-title": "var(--mini-z-index-title)",
        "mini-footer": "var(--mini-z-index-footer)",
        "mini-local-nav": "var(--mini-z-index-local-nav)",
        "mini-nav": "var(--mini-z-index-nav)",
        "mini-layout-top": "var(--mini-z-index-layout-top)",
        "mini-backdrop": "var(--mini-z-index-backdrop)",
        "mini-sidebar": "var(--mini-z-index-sidebar)",
        "mini-header": "var(--mini-z-index-header)",
        "mini-rainbow": "var(--mini-z-index-rainbow)",
      },
      colors: {
        "mini-background": "var(--mini-c-bg)",
        "mini-background-alt": "var(--mini-c-bg-alt)",
        "mini-background-elv": "var(--mini-c-bg-elv)",
        "mini-background-soft": "var(--mini-c-bg-soft)",
        "mini-backdrop": "var(--mini-backdrop-bg-color)",
        "mini-border": "var(--mini-c-border)",
        "mini-divider": "var(--mini-c-divider)",
        "mini-gutter": "var(--mini-c-gutter)",
        "mini-text-1": "var(--mini-c-text-1)",
        "mini-text-2": "var(--mini-c-text-2)",
        "mini-text-3": "var(--mini-c-text-3)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
    animation: {
      marquee: "marquee var(--duration) infinite linear",
      "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
    },
    keyframes: {
      rainbow: {
        "0%": {
          "background-position": "0%",
        },
        "100%": {
          "background-position": "200%",
        },
      },
      marquee: {
        from: {
          transform: "translateX(0)",
        },
        to: {
          transform: "translateX(calc(-100% - var(--gap)))",
        },
      },
      "marquee-vertical": {
        from: {
          transform: "translateY(0)",
        },
        to: {
          transform: "translateY(calc(-100% - var(--gap)))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
