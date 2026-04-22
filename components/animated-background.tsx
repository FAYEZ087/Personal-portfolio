"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

/**
 * Premium animated background:
 * - Drifting gradient blobs
 * - Faint cyber grid (vignette-masked)
 * - Floating neon particles
 * - Moving diagonal light streaks
 * - Subtle scanline overlay
 */
export function AnimatedBackground() {
  // Deterministic positions to avoid hydration mismatches
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: (i * 53) % 100,
        y: (i * 37) % 100,
        size: 1 + (i % 3),
        duration: 6 + (i % 5) * 1.5,
        delay: (i % 6) * 0.7,
      })),
    [],
  )

  const streaks = useMemo(
    () => [
      { top: "18%", delay: 0, duration: 9, opacity: 0.55 },
      { top: "46%", delay: 3.5, duration: 11, opacity: 0.4 },
      { top: "72%", delay: 6, duration: 10, opacity: 0.5 },
    ],
    [],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Cyber grid overlay (drifting for parallax feel) */}
      <div
        className="absolute inset-0 opacity-[0.1] animate-grid-drift"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.82 0.18 210 / 0.7) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.18 210 / 0.7) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Large perspective grid at the bottom for a "floor" feel */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] opacity-[0.12] animate-grid-drift"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.7 0.25 305 / 0.8) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.7 0.25 305 / 0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px, 80px 80px",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "center bottom",
          maskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Drifting purple blob */}
      <motion.div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-2xl sm:blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.25 305 / 0.5), transparent 70%)",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, 30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Drifting cyan blob */}
      <motion.div
        className="absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full blur-2xl sm:blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.18 220 / 0.4), transparent 70%)",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -50, -20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Center magenta accent blob */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-2xl sm:blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.22 320 / 0.25), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Diagonal moving light streaks */}
      <div className="hidden sm:block">
        {streaks.map((s, i) => (
          <motion.span
            key={i}
            className="absolute left-0 h-px w-[60%]"
            style={{
              top: s.top,
              background:
                "linear-gradient(90deg, transparent, oklch(0.82 0.18 210 / 0.9), oklch(0.7 0.25 305 / 0.9), transparent)",
              filter: "blur(0.5px)",
              transform: "rotate(-8deg)",
              transformOrigin: "left center",
              opacity: s.opacity,
            }}
            animate={{
              x: ["-60%", "180%"],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="hidden sm:block">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-accent/70"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: "0 0 8px oklch(0.82 0.18 210 / 0.8)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle scanlines */}
      <div
        className="hidden sm:block absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, oklch(1 0 0 / 0.9) 0 1px, transparent 1px 3px)",
        }}
      />

      {/* Top vignette for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 50%, oklch(0 0 0 / 0.4) 100%)",
        }}
      />
    </div>
  )
}
