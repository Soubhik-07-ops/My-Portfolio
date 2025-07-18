// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css' // Your existing global CSS import
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ParticlesBackground from '@/components/Background/ParticlesBackground'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Soubhik Roy | Portfolio',
  description: 'Portfolio of Full-Stack Developer Soubhik Roy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors flex flex-col min-h-screen`}
      >
        <ParticlesBackground />

        <Navbar />
        <ScrollProgress />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}