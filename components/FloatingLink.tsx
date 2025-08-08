'use client'

import { Phone, MapPin, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { JSX } from 'react'
import Image from 'next/image'

// --- Props interface for our typed component ---
interface FloatingLinkProps {
    href: string
    iconSrc: string
    label: string
    // The position prop is now optional and will hold all positioning classes
    position?: string
    color: string
}

/**
 * FloatingLink Component
 * A reusable, animated link component used for social media icons.
 * The `position` prop now controls its layout behavior (e.g., 'absolute' for desktop).
 */
const FloatingLink: React.FC<FloatingLinkProps> = ({ href, iconSrc, label, position = '', color }) => {
    // The 'absolute' class is no longer here by default. It's passed in via the 'position' prop.
    const classNames = `group z-10 flex items-center gap-2 py-2 px-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full text-sm transition-all text-gray-300 hover:text-white ${color} ${position}`;

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={classNames}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            // Use whileInView for mobile to trigger animation on scroll
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: Math.random() * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -3 }}
        >
            <span className="relative z-10">
                <Image
                    src={iconSrc}
                    alt={`${label} logo`}
                    width={20}
                    height={20}
                    className="group-hover:brightness-125 transition-all"
                />
            </span>
            <span className="hidden sm:inline relative z-10">{label}</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </motion.a>
    )
}