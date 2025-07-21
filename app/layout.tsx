import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout'

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors flex flex-col min-h-screen`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}