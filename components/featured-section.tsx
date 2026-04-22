"use client"

import Image from "next/image"
import type React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Sparkles, ArrowUpRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const easePremium = [0.22, 1, 0.36, 1] as const

type Project = {
  title: string
  tag: string
  href: string
  thumbnail: string
  message: string
  linkText?: string
}

const projects: Project[] = [
  {
    title: "Hallway Chat",
    tag: "VIDEO CHAT APP",
    href: "https://hallwaychat.online",
    thumbnail: "/hallway-chat.svg",
    message: "A next-generation video chat application built for only Students with premium features",
    linkText: "Visit hallwaychat.online",
  },
  {
    title: "DualCamera",
    tag: "IN PROGRESS",
    href: "#",
    thumbnail: "/dualcamera-tool.svg",
    message: "This creator tool is currently in active development. Stay tuned for updates!",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const parallaxX = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 })
  const parallaxY = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 })
  const imgScale = useSpring(useMotionValue(1.08), { stiffness: 200, damping: 22 })
  const liftY = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 })

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 14)
    rotateX.set(-(py - 0.5) * 12)
    parallaxX.set((px - 0.5) * -14)
    parallaxY.set((py - 0.5) * -14)
  }

  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    imgScale.set(1.18)
    liftY.set(-4)
    e.currentTarget.style.boxShadow =
      "0 24px 48px -12px oklch(0 0 0 / 0.6), 0 0 36px oklch(0.7 0.25 305 / 0.45), 0 0 70px oklch(0.82 0.18 210 / 0.2)"
  }

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    rotateX.set(0)
    rotateY.set(0)
    parallaxX.set(0)
    parallaxY.set(0)
    imgScale.set(1.08)
    liftY.set(0)
    e.currentTarget.style.boxShadow = ""
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.12, ease: easePremium }}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            y: liftY,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          }}
          className="group glass gradient-border relative overflow-hidden rounded-2xl transition-[box-shadow] duration-500 w-full text-left focus:outline-none cursor-pointer"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {/* Image with parallax + zoom */}
            <motion.div
              className="absolute inset-0"
              style={{ x: parallaxX, y: parallaxY, scale: imgScale }}
            >
              <Image
                src={project.thumbnail || "/placeholder.svg"}
                alt={`${project.title} — ${project.tag}`}
                fill
                sizes="(min-width: 640px) 200px, 45vw"
                className="object-cover"
              />
            </motion.div>

            {/* Depth gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Edge vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 120%, transparent 30%, oklch(0 0 0 / 0.6) 100%)",
              }}
            />

            {/* Animated gradient overlay on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
              style={{
                backgroundImage:
                  "linear-gradient(115deg, oklch(0.7 0.25 305 / 0.45), oklch(0.82 0.18 210 / 0.25) 40%, oklch(0.6 0.22 320 / 0.4) 70%, oklch(0.7 0.25 305 / 0.45))",
                backgroundSize: "220% 220%",
                animation: "overlay-shift 5s ease infinite",
              }}
            />

            {/* Radial hotspot glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 70%, oklch(0.7 0.25 305 / 0.55), transparent 65%)",
              }}
            />

            {/* Diagonal shimmer */}
            <span aria-hidden="true" className="shimmer-sweep rounded-2xl" />

            {/* Scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, oklch(1 0 0 / 0.9) 0 1px, transparent 1px 3px)",
              }}
            />

            {/* Corner index chip */}
            <div
              className="absolute left-3 top-3 flex items-center gap-1 rounded-md border border-border/60 bg-background/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur-md"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="h-1 w-1 rounded-full bg-primary" />
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3"
            style={{ transform: "translateZ(24px)" }}
          >
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-mono text-sm font-bold tracking-wide text-foreground">
                {project.title}
              </span>
              <span className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                {project.tag}
              </span>
            </div>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/40 bg-background/70 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10"
              aria-hidden="true"
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.tag}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <p className="text-sm text-foreground leading-relaxed">{project.message}</p>
          {project.href !== "#" && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-xl border border-border/60 bg-card/40 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-accent/50"
            >
              <span className="font-semibold text-foreground">{project.linkText || "Visit Project"}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function FeaturedSection() {
  return (
    <motion.section
      id="featured"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: easePremium }}
      className="flex flex-col gap-3"
      aria-label="Featured projects"
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Featured
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
          {String(projects.length).padStart(2, "0")} · Projects
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>
    </motion.section>
  )
}
