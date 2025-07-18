'use client'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const year = new Date().getFullYear()

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 relative">
            {/* 👇 Observer trigger for BackToTop */}
            <div id="footer-observer" className="absolute -top-16 h-1 w-full" />

            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>© {year} Soubhik Roy. All rights reserved.</span>

                <div className="flex gap-4">
                    <Link href="https://github.com/Soubhik-07-ops" target="_blank" className="hover:text-primary">
                        <Github size={18} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/soubhik-roy07/" target="_blank" className="hover:text-primary">
                        <Linkedin size={18} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
