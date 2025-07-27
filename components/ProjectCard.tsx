'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
    title: string
    description: string
    tech: string[]
    github?: string
    liveUrl?: string
    imageUrl: string
}

export default function ProjectCard({ title, description, tech, github, liveUrl, imageUrl }: Props) {
    return (
        <motion.div
            className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/90 rounded-xl p-6 shadow-xl overflow-hidden
                       border border-gray-700 hover:border-blue-500 transition-all duration-300
                       flex flex-col justify-between h-full transform hover:-translate-y-1 hover:shadow-2xl
                       backdrop-blur-sm hover:backdrop-blur"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            {/* Project Image */}
            <div className="relative w-full h-56 md:h-64 mb-5 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-3">
                    {title}
                </h2>
                <p className="text-gray-300 text-base mb-5 line-clamp-3">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                    {tech.map((item, idx) => (
                        <span
                            key={idx}
                            className="text-xs font-medium text-cyan-200 bg-cyan-900/40 px-3 py-1 rounded-full
                                       border border-cyan-700/50 group-hover:bg-cyan-800/50 transition-colors"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-700/60">
                {github && (
                    <Link
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-200
                                   px-4 py-2 rounded-lg bg-blue-900/40 hover:bg-blue-800/60 transition-all duration-300
                                   group-hover:translate-x-1 hover:shadow-blue-500/20 hover:shadow-md"
                    >
                        <Github size={18} /> <span className="text-sm font-medium">Code</span>
                    </Link>
                )}
                {liveUrl && (
                    <Link
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-200
                                   px-4 py-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 transition-all duration-300
                                   group-hover:translate-x-1 hover:shadow-purple-500/20 hover:shadow-md"
                    >
                        <ExternalLink size={18} /> <span className="text-sm font-medium">Live</span>
                    </Link>
                )}
            </div>
        </motion.div>
    )
}