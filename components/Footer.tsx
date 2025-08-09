'use client'

import { Phone, MapPin, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { JSX } from 'react'
import Image from 'next/image'
import { useContactForm } from '@/app/context/ContactFormContext'
import { Button } from './ui/button'

// --- Props interface for our typed component ---
interface FloatingLinkProps {
    href: string;
    iconSrc: string;
    label: string;
    // The position prop is optional and will hold all positioning classes for desktop view.
    position?: string;
    color: string;
}

/**
 * FloatingLink Component
 * A reusable, animated link component. Its layout is controlled by the `position` prop.
 */
const FloatingLink: React.FC<FloatingLinkProps> = ({ href, iconSrc, label, position = '', color }) => {
    // The 'absolute' class is passed via the 'position' prop, making the component flexible.
    const classNames = `group z-10 flex items-center gap-2 py-3 px-5 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full text-sm transition-all text-gray-300 hover:text-white ${color} ${position}`;

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={classNames}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: Math.random() * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -3 }}
        >
            <span className="relative z-10">
                <Image
                    src={iconSrc}
                    alt={`${label} logo`}
                    width={24}  // Increased from 20 to 24
                    height={24} // Increased from 20 to 24
                    className="group-hover:brightness-125 transition-all"
                />
            </span>
            <span className="hidden sm:inline relative z-10">{label}</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </motion.a>
    );
};

/**
 * Footer Component
 * Fully responsive, displaying a stacked layout on mobile and a floating layout on desktop.
 * The layout now switches at a custom 1340px breakpoint.
 */
const Footer = (): JSX.Element => {
    const year = new Date().getFullYear();
    const { open } = useContactForm()

    // Data for social links, including the specific classes for desktop positioning.
    const socialLinks: FloatingLinkProps[] = [
        {
            href: "https://github.com/Soubhik-07-ops",
            iconSrc: "/images/icons/github-logo.svg",
            label: "GitHub",
            position: "absolute top-[20%] left-[15%]",
            color: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
        },
        {
            href: "https://www.linkedin.com/in/soubhik-roy07/",
            iconSrc: "/images/icons/linkedin-logo.svg",
            label: "LinkedIn",
            position: "absolute top-[40%] left-[10%]",
            color: "hover:shadow-[0_0_20px_-5px_rgba(10,102,194,0.5)]"
        },
        {
            href: "https://leetcode.com/u/Soubhik_roy/",
            iconSrc: "/images/icons/leetcode-logo.svg",
            label: "LeetCode",
            position: "absolute top-[20%] right-[15%]",
            color: "hover:shadow-[0_0_20px_-5px_rgba(255,161,22,0.5)]"
        },
        {
            href: "https://www.geeksforgeeks.org/user/soubhi72yw/",
            iconSrc: "/images/icons/gfg-logo.svg",
            label: "GFG",
            position: "absolute top-[40%] right-[10%]",
            color: "hover:shadow-[0_0_20px_-5px_rgba(47,141,70,0.5)]"
        }
    ];

    return (
        <footer
            id="contact"
            className="relative bg-black border-t border-gray-800/50 pt-20 min-[1340px]:pt-32 pb-12 scroll-mt-20 overflow-hidden"
            style={{ zIndex: 10 }}
        >
            {/* --- Background (common for all screen sizes) --- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:3rem_3rem]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.3),rgba(255,255,255,0))]"></div>
            </div>

            {/* --- DESKTOP VIEW: Floating Social Links --- */}
            <div className="hidden min-[1340px]:block absolute top-0 left-0 right-0 h-full w-full">
                {socialLinks.map((link) => (
                    <FloatingLink key={link.label} {...link} />
                ))}
            </div>

            {/* --- Main Content Container --- */}
            <div className="relative z-20 max-w-2xl mx-auto text-center px-4">

                {/* --- MOBILE VIEW: Top two logos --- */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-10 min-[1340px]:hidden">
                    {/* Rendered without the 'position' prop to appear in the normal document flow. */}
                    {socialLinks.map((link, index) => (
                        <div key={index} className="scale-110 sm:scale-125"> {/* Added scaling for mobile */}
                            <FloatingLink {...link} position="" />
                        </div>
                    ))}
                </div>

                {/* --- Contact Hub (Visible on all screen sizes) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="p-8 bg-gray-950/60 backdrop-blur-lg border border-gray-700/80 rounded-2xl shadow-2xl shadow-black/40">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 mb-4"
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }}
                        >
                            Let's Build Together
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-gray-400 max-w-md mx-auto"
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}
                        >
                            Open for collaborations and new opportunities. Let's create something remarkable.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }} viewport={{ once: true }}
                            className="mt-8"
                        >
                            <Button
                                onClick={open}
                                className="cursor-pointer group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-gray-800 to-black border border-gray-600 rounded-full font-medium text-white transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_20px_theme(colors.pink.500/30)]"
                            >
                                <span className="relative z-10 text-cyan-400">Get In Touch</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* --- Bottom Bar (Visible on all screen sizes) --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative z-20 max-w-7xl mx-auto mt-20 text-center text-sm text-gray-500 px-4"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <MapPin size={14} className="text-pink-500" />
                            <span>Dhanbad, India</span>
                        </div>
                        <div className="hidden sm:block">•</div>
                        <a href="tel:+919835518101" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <Phone size={14} className="text-blue-500" />
                            <span>+91 98355 18101</span>
                        </a>
                    </div>
                    <p className="mt-4">© {year} Soubhik Roy. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;