'use client'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

type Props = {
    title: string
    description: string
    tech: string[]
    github?: string
    demo?: string
}

export default function ProjectCard({ title, description, tech, github, demo }: Props) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow hover:shadow-lg transition-all h-full flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {tech.map((item, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 mt-4">
                {github && (
                    <Link href={github} target="_blank" className="text-sm flex items-center gap-1 text-primary hover:underline">
                        <Github size={16} /> GitHub
                    </Link>
                )}
                {demo && (
                    <Link href={demo} target="_blank" className="text-sm flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink size={16} /> Live Demo
                    </Link>
                )}
            </div>
        </div>
    )
}
