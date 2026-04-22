import type { Metadata, Viewport } from "next"
import { Orbitron, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fayez Ahmad — Tech • Gaming • Student",
  description:
    "The official link hub of Fayez Ahmad. Tech creator, gamer, and student sharing projects, videos, and builds.",
  generator: "v0.app",
  openGraph: {
    title: "Fayez Ahmad — Tech • Gaming • Student",
    description: "Tech creator, gamer, and student. Explore my projects, videos, and links.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0118",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
