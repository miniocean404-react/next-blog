"use client"
import { useMounted } from "@/hook/mounted"
import { useTheme } from "next-themes"
import { Toaster } from "react-hot-toast"

export default function Toast() {
  const { systemTheme, theme, setTheme } = useTheme()
  const mounted = useMounted()
  const isDark = theme === "dark"

  if (!mounted) return <div></div>

  return (
    <Toaster
      toastOptions={{
        style: {
          background: isDark ? "#333" : "",
          color: isDark ? "#fff" : "",
        },
      }}
    />
  )
}
