"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const easePremium = [0.22, 1, 0.36, 1] as const

export function ProfileSection() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easePremium }}
      className="flex flex-col items-center gap-6 text-center"
    >
      {/* Avatar stack: hover lift + triple-ring + scanning line */}
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative flex h-36 w-36 items-center justify-center"
      >
        {/* Outer soft pulsing glow */}
        <motion.div
          className="absolute -inset-4 rounded-full blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.7 0.25 305 / 0.65), oklch(0.82 0.18 210 / 0.65), oklch(0.7 0.25 305 / 0.65))",
          }}
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Rotating conic gradient ring */}
        <div
          className="absolute inset-0 rounded-full animate-ring-spin"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.7 0.25 305), oklch(0.82 0.18 210), oklch(0.5 0.2 290), oklch(0.82 0.18 210), oklch(0.7 0.25 305))",
          }}
        />

        {/* Inner dark ring mask */}
        <div className="absolute inset-[3px] rounded-full bg-background" />

        {/* Counter-rotating dashed tech ring */}
        <svg
          className="absolute inset-[6px] rounded-full"
          viewBox="0 0 100 100"
          style={{ animation: "ring-spin 18s linear infinite reverse" }}
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="oklch(0.82 0.18 210 / 0.55)"
            strokeWidth="0.6"
            strokeDasharray="2 6"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="oklch(0.7 0.25 305 / 0.4)"
            strokeWidth="0.4"
            strokeDasharray="1 4"
          />
        </svg>

        {/* Avatar image */}
        <div
          className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-primary/50"
          style={{
            boxShadow:
              "0 0 30px oklch(0.7 0.25 305 / 0.45), inset 0 0 20px oklch(0 0 0 / 0.4)",
          }}
        >
          <Image
            src="/fayez-profile.jpg"
            alt="Fayez Ahmad — profile photo"
            fill
            sizes="112px"
            className="object-cover brightness-[0.8]"
            priority
          />
          {/* Moving horizontal scan line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-8"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.82 0.18 210 / 0.45), transparent)",
              animation: "scan-move 3.6s ease-in-out infinite",
              mixBlendMode: "screen",
            }}
          />
          {/* Subtle scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, oklch(0.82 0.18 210 / 0.6) 0 1px, transparent 1px 3px)",
            }}
          />
        </div>

        {/* Online status indicator */}
        <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 ring-2 ring-background">
          <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span
            className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 10px oklch(0.8 0.2 150)" }}
          />
          <span className="sr-only">Online</span>
        </span>
      </motion.div>

      {/* Holographic name + pulsing aura */}
      <div className="relative flex flex-col items-center gap-2">
        {/* Pulsing radial aura behind name */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-[min(26rem,92vw)] rounded-full blur-3xl animate-holo-glow"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.7 0.25 305 / 0.65), oklch(0.82 0.18 210 / 0.25) 55%, transparent 78%)",
          }}
          aria-hidden="true"
        />

        {/* Kicker */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 0.8, delay: 0.3, ease: easePremium }}
          className="relative font-mono text-[10px] uppercase text-muted-foreground/80"
        >
          — Welcome —
        </motion.span>

        {/* Holographic name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: easePremium }}
          className="relative font-mono text-[2.25rem] font-black leading-none tracking-tight text-balance sm:text-[3.25rem]"
        >
          <span className="holo-text">Fayez Ahmad</span>
          {/* Soft underglow ghost copy for holographic depth */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 font-black leading-none tracking-tight opacity-40 blur-md"
            style={{
              background:
                "linear-gradient(110deg, oklch(0.82 0.18 210), oklch(0.7 0.25 305))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Fayez Ahmad
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: easePremium }}
          className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span className="text-primary">Tech</span>
          <span className="h-1 w-1 rounded-full bg-accent/80" />
          <span className="text-accent">Gaming</span>
          <span className="h-1 w-1 rounded-full bg-accent/80" />
          <span className="text-primary">Student</span>
        </motion.p>
      </div>

      {/* Status chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: easePremium }}
        className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Signal · Online
        </span>
      </motion.div>
    </motion.header>
  )
}
