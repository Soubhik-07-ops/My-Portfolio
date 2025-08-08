"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BookText, ArrowUpRight, Clock, Cpu, Zap } from "lucide-react";
import styled from 'styled-components';

// Props remain the same
type PublicationCardProps = {
    title: string;
    authors: string;
    description: string;
    tags: string[];
    paperLink: string;
};

// Data for the "margin notes" section
const highlights = [
    { icon: Zap, text: "RL-based dynamic load balancing" },
    { icon: Clock, text: "40% reduction in response latency" },
    { icon: Cpu, text: "30% improvement in resource utilization" },
];

// Framer Motion variants for the card's initial appearance
const cardVariants: Variants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
};

const PublicationCard = ({ title, authors, description, tags, paperLink }: PublicationCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        if (isOpen) {
            e.preventDefault();
        }
        setIsOpen(!isOpen);
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="w-full h-full cursor-pointer"
            onClick={handleToggle}
        >
            <StyledBookWrapper>
                <div className={`book ${isOpen ? 'open' : ''}`}>
                    {/* ## INSIDE OF THE BOOK ## */}
                    <div className="w-full h-full flex flex-col md:flex-row rounded-lg overflow-auto md:overflow-hidden">

                        {/* LEFT COLUMN - Simplified for robust layout */}
                        <div className="w-full md:w-1/2 lg:w-1/3 p-6 flex-shrink-0 bg-slate-900 border-b border-slate-700 md:border-b-0 md:border-r">

                            {/* Highlights Section */}
                            <div>
                                <div className="p-2 w-fit rounded-lg bg-cyan-500/10 mb-6">
                                    <BookText className="text-cyan-400" size={24} />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm text-slate-300 uppercase tracking-widest">Highlights</h4>
                                    {highlights.map((item) => (
                                        <div key={item.text} className="flex items-start gap-3">
                                            <item.icon className="flex-shrink-0 mt-1 text-cyan-400" size={16} />
                                            <p className="text-xs text-slate-400">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies (Tags) Section - Now stacks cleanly below highlights */}
                            <div className="mt-8">
                                <h4 className="font-semibold text-sm text-slate-300 uppercase tracking-widest mb-3">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="w-full md:w-2/3 lg:w-3/4 p-6 sm:p-8 flex flex-col">
                            <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-100 mb-2">{title}</h3>
                            <p className="text-sm text-slate-400 mb-4">{authors}</p>
                            <div className="text-slate-300 text-sm/relaxed space-y-4">
                                <p>{description}</p>
                            </div>
                            <div className="mt-auto pt-8">
                                <a
                                    href={paperLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link inline-flex items-center gap-2 text-cyan-400 font-bold transition-colors hover:text-cyan-300"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>Read Full Paper</span>
                                    <ArrowUpRight size={20} className="transition-transform group-hover/link:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ## COVER OF THE BOOK ## */}
                    <div className="cover">
                        <div className="cover-front">
                            <div className="w-full h-full flex flex-col justify-center items-center text-center p-6">
                                <BookText className="text-cyan-300 mb-4" size={48} />
                                <h3 className="font-serif text-2xl font-bold text-slate-100 mb-2">{title}</h3>
                                <p className="text-sm text-slate-400 mb-8">{authors}</p>
                                <p className="font-bold text-cyan-400 tracking-wider uppercase text-sm">Tap or Hover to Open</p>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledBookWrapper>
        </motion.div>
    );
};

const StyledBookWrapper = styled.div`
    width: 100%;
    max-width: 700px;
    margin-inline: auto;
    
    /* UPDATED: Increased height from 560px to 620px */
    height: 620px;

    @media (max-width: 767px) {
        height: auto;
        max-height: 90vh; 
    }

    .book {
        position: relative;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        background-color: #1e293b;
        box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.5);
        transform: preserve-3d;
        perspective: 2000px;
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        transition: transform 0.7s;
        transform-origin: 0;
        transform-style: preserve-3d;
        background-color: #0f172a;
    }
    
    .cover-front {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        backface-visibility: hidden;
        background-image: linear-gradient(to right, #0f172a 98%, #1e293b 100%);
    }

    .book:hover .cover,
    .book.open .cover {
        transform: rotateY(-85deg);
    }
`;

export default PublicationCard;