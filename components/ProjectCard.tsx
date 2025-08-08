'use client'
import { useState, MouseEvent } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

type Props = {
    title: string
    description: string
    tech: string[]
    github?: string
    liveUrl?: string
    imageUrl: string
}

export default function ProjectCard({ title, description, tech, github, liveUrl, imageUrl }: Props) {
    // State to track mouse position for the spotlight effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div
            className="group relative h-full flex flex-col bg-slate-900/70 rounded-lg overflow-hidden
                       border border-slate-700/60 transition-colors duration-300 hover:border-blue-500/70"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* The interactive spotlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-lg"
                style={{
                    background: `radial-gradient(350px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
                }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative w-full h-48">
                <Image
                    src={imageUrl}
                    alt={`${title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Card Content */}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-3">{description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tech.map((item) => (
                        <span key={item} className="text-xs font-medium text-cyan-300 bg-cyan-900/60 px-3 py-1 rounded-full border border-cyan-800/50">
                            {item}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                    {github && (
                        <Link href={github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">
                            <motion.div className="flex items-center gap-2" whileHover="hover">
                                <motion.span variants={{ hover: { y: -2 } }}><Github size={18} /></motion.span>
                                <motion.span variants={{ hover: { x: 2 } }} className="text-sm font-semibold">Code</motion.span>
                            </motion.div>
                        </Link>
                    )}
                    {liveUrl && (
                        <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">
                            <motion.div className="flex items-center gap-2" whileHover="hover">
                                <motion.span variants={{ hover: { y: -2 } }}><ExternalLink size={18} /></motion.span>
                                <motion.span variants={{ hover: { x: 2 } }} className="text-sm font-semibold">Live Demo</motion.span>
                            </motion.div>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    )
}