"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

/**
 * Personal brand mark shown at the very top of the hub.
 * Replaces the previous generic system brand with a personal "F/A" monogram,
 * a tagline and a live local time readout — very "premium dashboard UI".
 */
export function BrandMark() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full items-center justify-between"
      aria-label="Brand header"
    >
      {/* Monogram */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8">
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-lg blur-md opacity-70"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.7 0.25 305), oklch(0.82 0.18 210))",
            }}
          />
          {/* Tile */}
          <div
            className="relative flex h-full w-full items-center justify-center rounded-lg border border-primary/40 bg-background/80 font-mono text-[11px] font-black tracking-tighter"
            style={{
              boxShadow:
                "inset 0 0 10px oklch(0.7 0.25 305 / 0.35), 0 0 12px oklch(0.7 0.25 305 / 0.25)",
            }}
          >
            <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              F/A
            </span>
          </div>
        </div>

        <div className="flex flex-col leading-none">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground">
            Fayez
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/80">
            Personal Hub
          </span>
        </div>
      </div>

      {/* Live telemetry */}
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
        <span className="hidden xs:inline-block">v2.6</span>
        <span className="hidden h-3 w-px bg-border/70 xs:inline-block" />
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="tabular-nums">{time || "--:--"}</span>
        </span>
      </div>
    </motion.div>
  )
}
