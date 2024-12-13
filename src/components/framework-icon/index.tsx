"use client"
import React, { type PropsWithChildren } from "react"
import {
  SiReact,
  SiGo,
  SiRust,
  SiElectron,
  SiWebpack,
  SiVite,
} from "@icons-pack/react-simple-icons"
import { cn } from "@/utils/tw"

export default function FrameworkIcon() {
  return (
    <section className="relative overflow-hidden">
      <div className="mb-3 grid translate-x-9 grid-cols-9 gap-6">
        {new Array(9).fill(null).map((item, index) => {
          return <FrameworkIconElement key={index} />
        })}
      </div>

      <div className="mb-3 grid translate-x-9 grid-cols-9 gap-6">
        <FrameworkIconElement />

        <FrameworkIconElement className="[--framework-icon:#61DAFB;]">
          <SiReact size={40} color="#61DAFB" />
        </FrameworkIconElement>

        <FrameworkIconElement className="[--framework-icon:#fed585;]">
          <SiRust size={40} color="#000000" />
        </FrameworkIconElement>

        <FrameworkIconElement className="[--framework-icon:#00ADD8;]">
          <SiGo size={40} color="#00ADD8" />
        </FrameworkIconElement>

        <FrameworkIconElement className="[--framework-icon:#47848F;]">
          <SiElectron size={40} color="#47848F" />
        </FrameworkIconElement>

        <FrameworkIconElement className="[--framework-icon:#8DD6F9;]">
          <SiWebpack size={40} color="#8DD6F9" />
        </FrameworkIconElement>

        <FrameworkIconElement className="[--framework-icon:#646CFF;]">
          <SiVite size={40} color="#646CFF" />
        </FrameworkIconElement>

        <FrameworkIconElement />
      </div>

      <div className="mb-3 grid translate-x-9 grid-cols-9 gap-6">
        {new Array(9).fill(null).map((item, index) => {
          return <FrameworkIconElement key={index} />
        })}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
    </section>
  )
}

function FrameworkIconElement({
  children,
  className,
}: PropsWithChildren<FrameworkIconElementProps>) {
  return (
    <a
      className={cn(
        "relative flex size-24 items-center justify-center rounded-xl border bg-mini-background-soft",
        {
          "before:absolute before:inset-[10%] before:-z-10 before:bg-[var(--framework-icon)] before:opacity-0 before:blur-xl before:transition-opacity before:duration-1000 before:will-change-[opacity]":
            children,
        },
        { "hover:before:opacity-100 hover:before:duration-200": children },
        className,
      )}
      href=""
    >
      {children}
    </a>
  )
}
