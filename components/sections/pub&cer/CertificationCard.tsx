"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Award } from "lucide-react";

type CertificationCardProps = {
    title: string;
    issuer: string;
    imageUrl: string;
    certLink: string;
    variants: Variants;
    custom: number;
};

const CertificationCard = ({ title, issuer, imageUrl, certLink, variants, custom }: CertificationCardProps) => {
    return (
        <motion.div
            variants={variants}
            custom={custom}
            initial="incoming"
            animate="active"
            exit="outgoing"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full h-full absolute flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm overflow-hidden group"
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Image container */}
            <div className="relative w-full h-3/5 overflow-hidden">
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <Image
                        src={imageUrl}
                        alt={`${title} certificate`}
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="group-hover:brightness-110 transition-all duration-500"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>
            </div>

            {/* Content section */}
            <div className="flex flex-col justify-between flex-grow p-6 relative">
                <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                >
                    <Award className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
                </motion.div>

                <div className="mb-4">
                    <motion.h3
                        whileHover={{ x: 5 }}
                        className="text-xl md:text-2xl font-bold text-neutral-50 mb-2 line-clamp-2"
                    >
                        {title}
                    </motion.h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-400">Issued by</span>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors"
                        >
                            {issuer}
                        </motion.span>
                    </div>
                </div>

                <motion.a
                    href={certLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                        scale: 1.05,
                        background: "linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold self-start mt-4 relative overflow-hidden"
                >
                    <span className="relative z-10">View Credential</span>
                    <motion.span
                        whileHover={{ x: 2 }}
                        className="relative z-10"
                    >
                        <ExternalLink size={18} className="ml-1" />
                    </motion.span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.a>
            </div>
        </motion.div>
    );
};

export default CertificationCard;