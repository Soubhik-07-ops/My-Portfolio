'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [scrollHeight, setScrollHeight] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = window.scrollY
            const height = document.body.scrollHeight - window.innerHeight
            const scrolled = (winScroll / height) * 100
            setScrollHeight(scrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed right-0 top-0 h-full w-1.5 z-[9999]">
            <div
                className="h-full bg-gradient-to-b from-cyan-400 to-blue-500 transition-all duration-300"
                style={{ height: `${scrollHeight}%` }}
            />
        </div>
    )
}
