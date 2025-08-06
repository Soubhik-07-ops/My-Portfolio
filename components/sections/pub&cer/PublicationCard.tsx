"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { BookText, ArrowUpRight, Clock, Cpu, Network, Server, Calendar, Users, Zap } from "lucide-react";

type PublicationCardProps = {
    title: string;
    authors: string;
    description: string;
    tags: string[];
    paperLink: string;
};

const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 30,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const DOT_POSITIONS = [
    { x: "10%", y: "20%", width: "8px", height: "8px" },
    { x: "30%", y: "50%", width: "12px", height: "12px" },
    { x: "70%", y: "30%", width: "6px", height: "6px" },
    { x: "20%", y: "70%", width: "10px", height: "10px" },
    { x: "80%", y: "60%", width: "14px", height: "14px" },
    { x: "50%", y: "20%", width: "9px", height: "9px" },
    { x: "40%", y: "80%", width: "7px", height: "7px" },
    { x: "90%", y: "10%", width: "11px", height: "11px" },
    { x: "60%", y: "40%", width: "13px", height: "13px" },
    { x: "10%", y: "90%", width: "5px", height: "5px" },
];

const PublicationCard = ({ title, authors, description, tags, paperLink }: PublicationCardProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -5px rgba(6, 182, 212, 0.3)"
            }}
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
            className="w-full h-full flex flex-col rounded-2xl p-8 bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm group relative overflow-hidden transition-all duration-300"
        >
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 [mask-image:radial-gradient(200px_at_100px_100px,white,transparent)] blur-xl transition-all duration-700 group-hover:opacity-80 group-hover:[mask-image:radial-gradient(300px_at_20px_40px,white,transparent)] group-hover:blur-2xl"></div>

            {isMounted && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {DOT_POSITIONS.map((pos, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-cyan-400/10"
                            style={{
                                left: pos.x,
                                top: pos.y,
                                width: pos.width,
                                height: pos.height,
                            }}
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + (i * 0.5),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="p-2 rounded-lg bg-cyan-500/10 backdrop-blur-sm"
                    >
                        <BookText className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={28} />
                    </motion.div>
                    <motion.h3
                        whileHover={{ x: 5 }}
                        className="text-2xl font-bold text-neutral-100 group-hover:text-cyan-100 transition-colors"
                    >
                        {title}
                    </motion.h3>
                </div>

                <div className="flex items-center gap-3 text-sm text-neutral-400 mb-4 group-hover:text-neutral-300 transition-colors">
                    <Users size={16} className="group-hover:text-cyan-400 transition-colors" />
                    <span>{authors}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-neutral-400 mb-6 group-hover:text-neutral-300 transition-colors">
                    <Calendar size={16} className="group-hover:text-cyan-400 transition-colors" />
                    <span>Published in Volume 7, Issue 2 (March-April 2025)</span>
                </div>

                <div className="mb-6">
                    <p className="text-neutral-300 mb-4 group-hover:text-neutral-200 transition-colors">
                        {description}
                    </p>
                    <p className="text-neutral-300 group-hover:text-neutral-200 transition-colors">
                        Our AI-ALB system integrates Envoy Proxy for traffic management, TensorFlow/PyTorch for model training,
                        and Kubernetes for orchestration, achieving automated scaling without manual intervention.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-cyan-900/20 transition-colors"
                    >
                        <Zap className="text-cyan-400 mt-1 flex-shrink-0 group-hover:text-cyan-300 transition-colors" size={18} />
                        <div>
                            <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-cyan-200 transition-colors">Key Innovation</h4>
                            <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Reinforcement learning-based dynamic load balancing</p>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-cyan-900/20 transition-colors"
                    >
                        <Clock className="text-cyan-400 mt-1 flex-shrink-0 group-hover:text-cyan-300 transition-colors" size={18} />
                        <div>
                            <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-cyan-200 transition-colors">Performance</h4>
                            <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">40% reduction in response latency</p>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-cyan-900/20 transition-colors"
                    >
                        <Cpu className="text-cyan-400 mt-1 flex-shrink-0 group-hover:text-cyan-300 transition-colors" size={18} />
                        <div>
                            <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-cyan-200 transition-colors">Efficiency</h4>
                            <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">30% improvement in resource utilization</p>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-cyan-900/20 transition-colors"
                    >
                        <Network className="text-cyan-400 mt-1 flex-shrink-0 group-hover:text-cyan-300 transition-colors" size={18} />
                        <div>
                            <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-cyan-200 transition-colors">Technology</h4>
                            <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Envoy Proxy, Kubernetes, TensorFlow/PyTorch</p>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-wrap gap-2 my-4">
                    {tags.map((tag) => (
                        <motion.span
                            key={tag}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(6, 182, 212, 0.3)",
                                borderColor: "#06b6d4"
                            }}
                            className="px-3 py-1 text-xs rounded-full bg-cyan-900/50 text-cyan-300 border border-cyan-900 cursor-default"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                <div className="mt-auto pt-4">
                    <motion.a
                        href={paperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: "#06b6d4",
                            color: "#000",
                            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-800 text-neutral-100 font-semibold transition-all duration-300 relative overflow-hidden"
                    >
                        <span className="relative z-10">Read Full Paper</span>
                        <motion.span
                            whileHover={{ x: 3 }}
                            className="relative z-10"
                        >
                            <ArrowUpRight size={20} />
                        </motion.span>
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </motion.a>
                    <p className="text-xs text-neutral-500 mt-2 group-hover:text-neutral-400 transition-colors">DOI: 10.36948/jjfmr.2025.v07i02.38725</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PublicationCard;