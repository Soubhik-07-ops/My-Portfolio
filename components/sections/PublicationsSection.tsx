'use client'
import { ExternalLink, FileText, User, BarChart2, Cpu, Cloud, Zap, Download, Code, Server, Layers } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PublicationsSection() {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <section id="publications" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    Research & Publication
                </h2>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                    Just Explore My Research Section, It will give valuable Resource to you....
                </p>
            </motion.div>

            {/* 3D Flip Container (Fixed Height) */}
            <div className="perspective-1000 h-[580px]">
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full h-full cursor-auto"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front Side */}
                    <motion.div
                        className="absolute w-full h-full backface-hidden group"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="relative h-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800/80 border border-zinc-700/50 rounded-xl p-8 backdrop-blur-lg overflow-hidden hover:border-cyan-400/30 transition-all duration-300 h-full flex flex-col">
                                {/* Tech Icons Background */}
                                <Cpu className="absolute -right-10 -top-10 text-zinc-700/30 w-32 h-32" />
                                <Cloud className="absolute -left-10 -bottom-10 text-zinc-700/30 w-32 h-32" />

                                {/* Header */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 z-10">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-cyan-400" size={22} />
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                            AI Meets Load Balancing
                                        </h3>
                                    </div>
                                    <Link
                                        href="https://www.ijfmr.com/research-paper.php?id=38725"
                                        target="_blank"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-zinc-700/50 hover:bg-cyan-900/30 border border-zinc-600 hover:border-cyan-400/50 text-cyan-400 hover:text-white transition-all group/link"
                                    >
                                        View Publication
                                        <ExternalLink size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>

                                {/* Authors & Tags */}
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 z-10">
                                    <User size={16} className="text-cyan-400" />
                                    <span>Soubhik Roy, Team @ IIT Dhanbad</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6 z-10">
                                    {['Reinforcement Learning', 'Kubernetes', 'DevOps AI'].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-900/20 hover:border-cyan-400/40 transition"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Abstract Preview */}
                                <p className="text-gray-300 text-sm leading-relaxed mb-6 z-10 line-clamp-5">
                                    Modern microservices architectures face increasing challenges in handling unpredictable traffic surges. Traditional static load balancers often fail to adapt to real-time traffic, resulting in poor performance. This research proposes <span className="text-cyan-300 font-medium">AI-ALB</span> — an adaptive, reinforcement learning-based load balancing system integrated with Kubernetes, Envoy Proxy, and TensorFlow/PyTorch — achieving automated traffic management and scalability across cloud platforms.
                                </p>

                                {/* Performance Metrics */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 z-10">
                                    {[
                                        { icon: <Zap size={18} className="text-green-400" />, value: "-40%", label: "Latency" },
                                        { icon: <BarChart2 size={18} className="text-yellow-400" />, value: "+30%", label: "Efficiency" },
                                        { icon: <Cpu size={18} className="text-blue-400" />, value: "-50%", label: "Training Time" },
                                    ].map((metric, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5 }}
                                            className="bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700/50 hover:border-cyan-400/30 rounded-xl p-4 transition-all"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {metric.icon}
                                                <p className="text-xl font-bold">{metric.value}</p>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1 text-center">{metric.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Read More Button */}
                                <motion.button
                                    onClick={handleFlip}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-auto w-full py-3 text-sm bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
                                >
                                    Explore Full Research
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                        className="absolute w-full h-full backface-hidden group"
                        style={{
                            backfaceVisibility: 'hidden',
                            rotateY: 180,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <div className="relative h-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800/80 border border-cyan-400/30 rounded-xl p-8 backdrop-blur-lg h-full overflow-y-auto">
                                <div className="flex flex-col h-full">
                                    {/* Back Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-cyan-400 mb-1">AI-ALB Deep Dive</h3>
                                            <p className="text-sm text-gray-400">Reinforcement Learning for Cloud Scalability</p>
                                        </div>
                                        <button
                                            onClick={handleFlip}
                                            className="text-xs px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors cursor-pointer"
                                        >
                                            ← Back
                                        </button>
                                    </div>

                                    {/* Expanded Content */}
                                    <div className="space-y-6 flex-grow">
                                        {/* Methodology */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-lg font-semibold text-cyan-300 mb-3">
                                                <Code size={18} /> Methodology
                                            </h4>
                                            <ul className="text-sm text-gray-300 space-y-2 pl-5 list-disc">
                                                <li>Integrated <span className="text-cyan-300">Proximal Policy Optimization (PPO)</span> with Kubernetes scheduler</li>
                                                <li>Real-time traffic analysis via <span className="text-cyan-300">Envoy Proxy metrics</span></li>
                                                <li>Distributed TensorFlow training across <span className="text-cyan-300">AWS/GCP/Azure nodes</span></li>
                                            </ul>
                                        </div>

                                        {/* Hardware/Software */}
                                        <div className="mb-6">
                                            <h4 className="flex items-center gap-2 text-lg font-semibold text-cyan-300 mb-3">
                                                <Server size={18} /> Experimental Setup
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                                <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 hover:border-cyan-400/30 transition">
                                                    <p className="font-medium text-cyan-300 flex items-center gap-1"><Cpu size={16} /> Hardware</p>
                                                    <ul className="mt-1 space-y-1 text-gray-300">
                                                        <li>• AWS EC2 (c5.2xlarge)</li>
                                                        <li>• 20-node Kubernetes cluster</li>
                                                        <li>• NVIDIA T4 GPUs</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 hover:border-cyan-400/30 transition">
                                                    <p className="font-medium text-cyan-300 flex items-center gap-1"><Code size={16} /> Software</p>
                                                    <ul className="mt-1 space-y-1 text-gray-300">
                                                        <li>• Kubernetes 1.26</li>
                                                        <li>• TensorFlow 2.12</li>
                                                        <li>• Envoy Proxy</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Key References (Top 2) */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-lg font-semibold text-cyan-300 mb-3">
                                                <Layers size={18} /> Key References
                                            </h4>
                                            <div className="text-sm text-gray-300 space-y-3">
                                                <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 hover:border-cyan-400/30 transition">
                                                    <p className="font-medium text-cyan-300">1. Mao et al. (2016)</p>
                                                    <p>"Resource management with deep reinforcement learning," <span className="text-cyan-300">Proc. ACM HotNets</span>.</p>
                                                </div>
                                                <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 hover:border-cyan-400/30 transition">
                                                    <p className="font-medium text-cyan-300">2. Sohail & Kumar (2024)</p>
                                                    <p>"Reinforcement Learning for Optimized Load Balancing," <span className="text-cyan-300">J. Cloud Comput. Res.</span>.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 mt-10 sticky bottom-0 bg-zinc-900/80 p-2 -mx-2 rounded-lg">
                                        <Link
                                            href="https://www.ijfmr.com/research-paper.php?id=38725"
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-zinc-700/50 hover:bg-cyan-900/30 border border-zinc-600 hover:border-cyan-400/50 text-cyan-400 hover:text-white transition-all flex-1"
                                        >
                                            <ExternalLink size={16} /> View Online
                                        </Link>
                                        <a
                                            href="/research.pdf"
                                            download="AI-ALB_Research_Paper.pdf"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-cyan-900/30 hover:bg-cyan-800/50 border border-cyan-400/50 text-cyan-400 hover:text-white transition-all flex-1"
                                        >
                                            <Download size={16} /> Download PDF
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}