import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  // 为所有的 tailwindcss 类名添加前缀
  // prefix: "mini",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {},
    extend: {
      padding: {
        // 修改 p-1 是 padding:0.25rem 改为 p-1 是 padding:30px
        // "1": "30px",
      },
      fontSize: {
        // 修改 text-base 改为 font-size: 30px; line-height: 2rem;
        // base: ["30px", "2rem"],
      },
    },
    screens: {
      // 修改媒体查询 768px 尺寸为 300px
      // md: "300px",
    },
    animation: { marquee: "marquee var(--duration) infinite linear", "marquee-vertical": "marquee-vertical var(--duration) linear infinite" },
    keyframes: {
      rainbow: {
        "0%": { "background-position": "0%" },
        "100%": { "background-position": "200%" },
      },
      marquee: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(calc(-100% - var(--gap)))" },
      },
      "marquee-vertical": {
        from: { transform: "translateY(0)" },
        to: { transform: "translateY(calc(-100% - var(--gap)))" },
      },
    },
  },
  plugins: [],
}
export default config
