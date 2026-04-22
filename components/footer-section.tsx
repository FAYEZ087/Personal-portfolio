"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Twitter, Instagram, Twitch, Linkedin, Github } from "lucide-react"

type Social = {
  label: string
  href: string
  icon: LucideIcon
}

const socials: Social[] = [
  { label: "Twitter / X", href: "https://x.com/fayez_ahmad499", icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/_fayez_087/?hl=en", icon: Instagram },
  { label: "GitHub", href: "https://github.com/FAYEZ087", icon: Github },
  { label: "Twitch", href: "https://www.twitch.tv/madamxunite", icon: Twitch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fayez-ahmad-624619333/", icon: Linkedin },
]

export function FooterSection() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-4 flex flex-col items-center gap-4"
    >
      <ul className="flex items-center gap-2">
        {socials.map((social) => {
          const Icon = social.icon
          return (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 18px oklch(0.7 0.25 305 / 0.35)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = ""
                }}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </li>
          )
        })}
      </ul>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
        © {new Date().getFullYear()} Fayez Ahmad · Built with code & caffeine
      </p>
    </motion.footer>
  )
}
