"use client"

import type { LucideIcon } from "lucide-react"
import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Youtube, Github, FolderKanban, Mail, ArrowUpRight, Globe } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type LinkItem = {
  label: string
  description: string
  href?: string
  icon: LucideIcon
  accent: "primary" | "accent"
  meta: string
  subLinks?: { label: string; description?: string; href: string }[]
}

const links: LinkItem[] = [
  {
    label: "YouTube",
    description: "Gaming & Creative Edits",
    icon: Youtube,
    accent: "primary",
    meta: "Channels",
    subLinks: [
      { 
        label: "Gaming", 
        description: "Pokemon Unite and Clash of Clans", 
        href: "https://www.youtube.com/@madmaxunite" 
      },
      { 
        label: "Edits", 
        description: "Anime, cars, and movies", 
        href: "https://www.youtube.com/@fayez_editz" 
      },
    ],
  },
  {
    label: "GitHub",
    description: "Profile & Repositories",
    icon: Github,
    accent: "accent",
    meta: "48 repos",
    subLinks: [
      {
        label: "GitHub Profile",
        description: "View my main profile",
        href: "https://github.com/FAYEZ087",
      },
      {
        label: "Repositories",
        description: "Explore my open-source projects",
        href: "https://github.com/repos",
      },
    ],
  },
  {
    label: "Portfolio",
    description: "My personal website & resume",
    href: "https://portfolio-lovat-tau-81.vercel.app/",
    icon: Globe,
    accent: "primary",
    meta: "Website",
  },
  {
    label: "Contact",
    description: "Get in touch via email",
    icon: Mail,
    accent: "accent",
    meta: "Always Available",
    subLinks: [
      {
        label: "University Email",
        description: "24155102@kiit.ac.in",
        href: "mailto:24155102@kiit.ac.in",
      },
      {
        label: "Personal Email",
        description: "fayezahmad827@gmail.com",
        href: "mailto:fayezahmad827@gmail.com",
      },
    ],
  },
]

const easePremium = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.7 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easePremium },
  },
}

function TiltLink({ link }: { link: LinkItem }) {
  const Icon = link.icon
  const accentColor = link.accent

  // 3D tilt + lift
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 })
  const scale = useSpring(useMotionValue(1), { stiffness: 300, damping: 25 })
  const liftY = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 })

  // Light sweep coordinates
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sweep = useTransform(
    [mx, my] as const,
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, oklch(1 0 0 / 0.18), transparent 45%)`,
  )

  const glow =
    accentColor === "primary"
      ? "0 10px 30px -10px oklch(0 0 0 / 0.6), 0 0 32px oklch(0.7 0.25 305 / 0.5), 0 0 70px oklch(0.7 0.25 305 / 0.22)"
      : "0 10px 30px -10px oklch(0 0 0 / 0.6), 0 0 32px oklch(0.82 0.18 210 / 0.5), 0 0 70px oklch(0.82 0.18 210 / 0.22)"

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    rotateY.set((px - 0.5) * 14)
    rotateX.set(-(py - 0.5) * 12)
    mx.set(px * 100)
    my.set(py * 100)
  }

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    liftY.set(0)
    mx.set(50)
    my.set(50)
    e.currentTarget.style.boxShadow = ""
  }

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    scale.set(1.025)
    liftY.set(-3)
    e.currentTarget.style.boxShadow = glow
  }

  const content = (
    <>
      {/* Cursor-follow radial light */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: sweep }}
      />

      {/* Diagonal shimmer that sweeps across on hover */}
      <span aria-hidden="true" className="shimmer-sweep rounded-2xl" />

      {/* Scanline overlay on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, oklch(1 0 0 / 0.06) 0 1px, transparent 1px 4px)",
        }}
      />

      {/* Icon tile */}
      <span
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70 transition-transform duration-300 group-hover:scale-110 ${
          accentColor === "primary" ? "text-primary" : "text-accent"
        }`}
        style={{
          boxShadow:
            accentColor === "primary"
              ? "inset 0 0 14px oklch(0.7 0.25 305 / 0.35), 0 0 12px oklch(0.7 0.25 305 / 0.2)"
              : "inset 0 0 14px oklch(0.82 0.18 210 / 0.35), 0 0 12px oklch(0.82 0.18 210 / 0.2)",
          transform: "translateZ(26px)",
        }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      {/* Text */}
      <span
        className="relative z-10 flex min-w-0 flex-1 flex-col text-left"
        style={{ transform: "translateZ(18px)" }}
      >
        <span className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
            {link.label}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80">
            · {link.meta}
          </span>
        </span>
        <span className="truncate text-xs text-muted-foreground">{link.description}</span>
      </span>

      {/* Arrow */}
      <ArrowUpRight
        className="relative z-10 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden="true"
        style={{ transform: "translateZ(18px)" }}
      />
    </>
  )

  const commonStyles = {
    rotateX,
    rotateY,
    scale,
    y: liftY,
    transformPerspective: 1000,
    transformStyle: "preserve-3d" as const,
    background:
      "linear-gradient(180deg, oklch(0.22 0.05 295 / 0.6), oklch(0.14 0.04 290 / 0.7))",
    boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06), inset 0 0 20px oklch(0 0 0 / 0.35)",
  }

  const commonClasses =
    "group gradient-border relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-4 backdrop-blur-xl transition-[box-shadow] duration-300"

  if (link.subLinks) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <motion.button
            variants={item}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const px = (e.clientX - rect.left) / rect.width
              const py = (e.clientY - rect.top) / rect.height
              rotateY.set((px - 0.5) * 14)
              rotateX.set(-(py - 0.5) * 12)
              mx.set(px * 100)
              my.set(py * 100)
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={(e) => {
              rotateX.set(0)
              rotateY.set(0)
              scale.set(1)
              liftY.set(0)
              mx.set(50)
              my.set(50)
              e.currentTarget.style.boxShadow = ""
            }}
            whileTap={{ scale: 0.975 }}
            style={commonStyles}
            className={`${commonClasses} w-full text-left focus:outline-none`}
          >
            {content}
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{link.label}</DialogTitle>
            <DialogDescription>{link.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            {link.subLinks.map((sl) => (
              <a
                key={sl.label}
                href={sl.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-accent/50"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground">{sl.label}</span>
                  {sl.description && (
                    <span className="text-xs text-muted-foreground">{sl.description}</span>
                  )}
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <motion.a
      href={link.href}
      target={link.href?.startsWith("http") ? "_blank" : undefined}
      rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      variants={item}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        rotateY.set((px - 0.5) * 14)
        rotateX.set(-(py - 0.5) * 12)
        mx.set(px * 100)
        my.set(py * 100)
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={(e) => {
        rotateX.set(0)
        rotateY.set(0)
        scale.set(1)
        liftY.set(0)
        mx.set(50)
        my.set(50)
        e.currentTarget.style.boxShadow = ""
      }}
      whileTap={{ scale: 0.975 }}
      style={commonStyles}
      className={commonClasses}
    >
      {content}
    </motion.a>
  )
}

export function LinksSection() {
  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="show"
      aria-label="Primary links"
      className="flex flex-col gap-3"
    >
      {links.map((link) => (
        <TiltLink key={link.label} link={link} />
      ))}
    </motion.nav>
  )
}
