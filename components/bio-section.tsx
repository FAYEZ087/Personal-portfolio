"use client"

import { motion } from "framer-motion"

export function BioSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="text-center"
      aria-label="About"
    >
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        Building sleek apps, dropping {"Pok\u00e9mon"} Unite content, and grinding ranked matches. Welcome to my
        corner of the internet.
      </p>
    </motion.section>
  )
}
