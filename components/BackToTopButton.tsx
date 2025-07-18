'use client'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToTopButton() {
    const [visible, setVisible] = useState(false)
    const [nearFooter, setNearFooter] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setNearFooter(entry.isIntersecting)
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        )

        const target = document.getElementById('footer-observer')
        if (target) observer.observe(target)

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (target) observer.unobserve(target)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={scrollToTop}
            className={`
        fixed right-6 z-50 group transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        ${nearFooter ? 'bottom-20' : 'bottom-6'}
      `}
            aria-label="Back to top"
        >
            <div
                className="
          p-[2px] rounded-full bg-gradient-to-br from-cyan-500 via-fuchsia-600 to-purple-800
          shadow-xl shadow-cyan-500/30 transition-all
          group-hover:from-pink-500 group-hover:to-blue-500 cursor-pointer
        "
            >
                <div
                    className="
            bg-black/80 dark:bg-zinc-900 backdrop-blur-md
            rounded-full p-3 flex items-center justify-center
            hover:scale-110 transition-transform
          "
                >
                    <ArrowUpRight
                        size={20}
                        className="text-white dark:text-cyan-300 group-hover:rotate-315 transition-transform"
                    />
                </div>
            </div>
        </button>
    )
}
