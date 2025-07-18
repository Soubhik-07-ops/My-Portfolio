'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Particles from '@/ReactBits/Particles/Particles'

const SocialCards = () => {
    return (
        <div className="max-w-fit rounded-xl backdrop-blur-[15px] bg-white/5 border border-cyan-400/20 shadow-[inset_0_0_10px_rgba(34,211,238,0.1),0_5px_15px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-400/40">
            <ul className="p-4 flex list-none gap-4 items-center justify-center flex-wrap">
                {/* GitHub */}
                <li className="group relative cursor-pointer transition-all duration-500">
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.2] h-[60px] w-[60px] rounded-full bg-cyan-400/20 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.4] group-hover:translate-x-[5px] group-hover:-translate-y-[5px] h-[60px] w-[60px] rounded-full bg-cyan-400/30 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.6] group-hover:translate-x-[10px] group-hover:-translate-y-[10px] h-[60px] w-[60px] rounded-full bg-cyan-400/40 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <a
                        href="https://github.com/Soubhik-07-ops"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 group-hover:translate-x-[5px] group-hover:-translate-y-[5px] transition-all duration-300"
                    >
                        <Github className="h-[60px] w-[60px] p-4 rounded-full text-cyan-400 bg-white/5 shadow-[inset_0_0_10px_rgba(34,211,238,0.2),0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_0_15px_rgba(34,211,238,0.3),0_3px_15px_rgba(0,0,0,0.2)]" />
                    </a>
                    <div className="opacity-0 group-hover:opacity-100 rounded px-2 py-1 absolute z-[9999] -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-500/20 text-cyan-300 shadow-[0_3px_10px_rgba(34,211,238,0.2)] transition-all duration-300 transform group-hover:translate-y-0 group-hover:skew-x-[-5deg] backdrop-blur-sm">
                        GitHub
                    </div>
                </li>

                {/* LinkedIn */}
                <li className="group relative cursor-pointer transition-all duration-500">
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.2] h-[60px] w-[60px] rounded-full bg-cyan-400/20 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.4] group-hover:translate-x-[5px] group-hover:-translate-y-[5px] h-[60px] w-[60px] rounded-full bg-cyan-400/30 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.6] group-hover:translate-x-[10px] group-hover:-translate-y-[10px] h-[60px] w-[60px] rounded-full bg-cyan-400/40 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <a
                        href="https://www.linkedin.com/in/soubhik-roy07/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 group-hover:translate-x-[5px] group-hover:-translate-y-[5px] transition-all duration-300"
                    >
                        <Linkedin className="h-[60px] w-[60px] p-4 rounded-full text-cyan-400 bg-white/5 shadow-[inset_0_0_10px_rgba(34,211,238,0.2),0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_0_15px_rgba(34,211,238,0.3),0_3px_15px_rgba(0,0,0,0.2)]" />
                    </a>
                    <div className="opacity-0 group-hover:opacity-100 rounded px-2 py-1 absolute z-[9999] -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-500/20 text-cyan-300 shadow-[0_3px_10px_rgba(34,211,238,0.2)] transition-all duration-300 transform group-hover:translate-y-0 group-hover:skew-x-[-5deg] backdrop-blur-sm">
                        LinkedIn
                    </div>
                </li>

                {/* Mail */}
                <li className="group relative cursor-pointer transition-all duration-500">
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.2] h-[60px] w-[60px] rounded-full bg-cyan-400/20 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.4] group-hover:translate-x-[5px] group-hover:-translate-y-[5px] h-[60px] w-[60px] rounded-full bg-cyan-400/30 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <span className="pointer-events-none absolute opacity-0 group-hover:opacity-[0.6] group-hover:translate-x-[10px] group-hover:-translate-y-[10px] h-[60px] w-[60px] rounded-full bg-cyan-400/40 shadow-[inset_0_0_10px_rgba(34,211,238,0.3),0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300" />
                    <a
                        href="mailto:soubhik0727@gmail.com"
                        className="relative z-10 group-hover:translate-x-[5px] group-hover:-translate-y-[5px] transition-all duration-300"
                    >
                        <Mail className="h-[60px] w-[60px] p-4 rounded-full text-cyan-400 bg-white/5 shadow-[inset_0_0_10px_rgba(34,211,238,0.2),0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_0_15px_rgba(34,211,238,0.3),0_3px_15px_rgba(0,0,0,0.2)]" />
                    </a>
                    <div className="opacity-0 group-hover:opacity-100 rounded px-2 py-1 absolute z-[9999] -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-500/20 text-cyan-300 shadow-[0_3px_10px_rgba(34,211,238,0.2)] transition-all duration-300 transform group-hover:translate-y-0 group-hover:skew-x-[-5deg] backdrop-blur-sm">
                        Email
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isClient, setIsClient] = useState(false)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Responsive image parallax effect
    const imageX = useTransform(scrollYProgress, [0, 1], [0, 100])
    const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 1])

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <section
                ref={containerRef}
                className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900 px-6 pt-32"
            >
                {/* Static fallback content */}
                <div className="relative z-10 mx-auto max-w-6xl">
                    <div className="mb-6 text-lg font-medium text-cyan-400">Hello, I'm</div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Soubhik Roy
                        </span>
                    </h1>
                </div>
            </section>
        )
    }

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900 px-4 sm:px-6 pt-24 md:pt-32"
            style={{
                zIndex: 10,
            }}
        >
            {/* Custom Particles Background */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                <Particles
                    particleColors={['#1a3777ff', '#ffffffff']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Responsive Profile Image */}
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
                style={{
                    width: 'min(100vw, 800px)',
                    height: 'min(125vw, 1000px)',
                    maxWidth: '100%',
                    x: imageX,
                    opacity: imageOpacity
                }}
            >
                <Image
                    src="/images/soubhik.png"
                    alt="Soubhik Roy"
                    fill
                    className="object-contain object-right"
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-30 mx-auto max-w-6xl mt-10">
                {/* Animated Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 md:mb-6 text-lg font-medium text-cyan-400"
                >
                    Hello, I'm
                </motion.div>

                {/* 3D Name Animation */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter max-w-2xl"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Soubhik Roy
                    </span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2 text-cyan-400"
                    >
                        |
                    </motion.span>
                </motion.h1>

                {/* Typing Animation */}
                <div className="my-4 md:my-6 h-10 md:h-12 text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 max-w-2xl">
                    <TypeAnimation
                        sequence={[
                            'Full-Stack Developer',
                            1500,
                            'AI & System Design Enthusiast',
                            1500,
                            'DevOps Engineer',
                            1500,
                            'Cloud Architect',
                            1500
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400"
                    />
                </div>

                {/* Buttons */}
                <div className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#projects">
                            <Button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-semibold shadow-lg hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.3)] transition-all duration-300 cursor-pointer">
                                <span className="relative z-10">View Projects</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Button>
                        </a>

                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant="outline" className="group relative overflow-hidden rounded-lg border-2 border-cyan-400/50 px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md hover:shadow-[0_0_15px_2px_rgba(34,211,238,0.2)] transition-all duration-300">
                            <span className="relative z-10 text-cyan-400">Hire Me!</span>
                            <span className="absolute inset-0 bg-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>
                    </motion.div>
                </div>

                {/* Social Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 md:mt-16"
                >
                    <SocialCards />
                </motion.div>
            </div>
        </section>
    )
}