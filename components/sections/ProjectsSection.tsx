"use client";

import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect, JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the type for a single project
interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string;
    liveUrl?: string; // Optional as not all projects have a live URL
    imageUrl: string;
}

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);

    return matches;
};

const projects: Project[] = [
    {
        title: "AI Model Benchmarking Tool",
        description: "Developed a comprehensive tool to benchmark over 25 machine learning models against custom datasets. Features include PDF report generation, real-time performance dashboards via Supabase, and achieving sub-50ms latency for critical operations.",
        tech: ["Next.js", "Supabase", "PostgreSQL", "Pandas", "Plotly"],
        github: "https://github.com/Soubhik-07-ops/AI_MODEL_BENCHMARK",
        liveUrl: "https://ai-benchmarking-tool.vercel.app/",
        imageUrl: "/images/projects/Benchmark.png",
    },
    {
        title: "Study Wise – AI-Powered Exam Platform",
        description: "Engineered an AI-driven exam preparation platform offering personalized study strategies, predictive question analysis, intuitive drag-and-drop UI for custom exam creation, and printable PDF study kits for both students and educators.",
        tech: ["React", "Express.js", "JWT", "MongoDB", "OpenAI API"],
        github: "https://github.com/Soubhik-07-ops/AI-Study_Planner",
        liveUrl: "https://prepiq.vercel.app/",
        imageUrl: "/images/projects/StudyWise.png",
    },
    {
        title: "Face Mask Detection System",
        description: "Implemented and deployed a high-accuracy (98%) face mask detection system using MobileNetV2. Integrated with Flask to provide a real-time REST API and leveraged OpenCV for live webcam stream analysis, suitable for IoT applications.",
        tech: ["Flask", "OpenCV", "MobileNetV2", "TensorFlow", "IoT"],
        github: "https://github.com/Soubhik-07-ops/Mask_Detection",
        imageUrl: "/images/projects/Face.png",
        liveUrl: "https://yourmask.streamlit.app/",
    },
    {
        title: "BookNest E-Commerce",
        description: "Developed a full-stack e-commerce platform for books with comprehensive features including user authentication, shopping cart, order management, and PAN-India shipping. Achieved a Lighthouse performance score greater than 90 across all metrics.",
        tech: ["Next.js", "Tailwind CSS", "Node.js", "Stripe", "PostgreSQL"],
        github: "https://github.com/Soubhik-07-ops/BookNest",
        liveUrl: "https://book-nest-plum.vercel.app/",
        imageUrl: "/images/projects/BookNest.png",
    },
    {
        title: "EV-Routing Algorithm – IIT Dhanbad",
        description: "Contributed to an innovative project at IIT Dhanbad, optimizing routing for a multiple electric vehicle fleet across routes exceeding 500km. Developed custom EV-routing algorithms that resulted in a 20% reduction in vehicle turnaround time.",
        tech: ["TypeScript", "Flask", "Next.js", "DataViz", "Optimization Algorithms"],
        github: "https://github.com/Soubhik-07-ops/My-Portfolio",
        imageUrl: "/images/projects/Route.png",
    },
    {
        title: "Personal Portfolio",
        description: "The first iteration of my personal portfolio website, built with modern web technologies to showcase my skills and projects. Focused on responsive design and clean aesthetics.",
        tech: ["React", "Next", "Typescript", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/Soubhik-07-ops/My-Portfolio",
        liveUrl: "https://my-portfolio-tau-red-14.vercel.app/",
        imageUrl: "/images/projects/Portfolio.png",
    },
];

// Animation Variants for Framer Motion, now with sliding effect
const sliderVariants: Variants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.95,
    }),
    active: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    },
    outgoing: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.4, ease: "easeIn" }
    })
};


export default function ProjectsSection(): JSX.Element {
    const isLg = useMediaQuery('(min-width: 1024px)');
    const isSm = useMediaQuery('(min-width: 640px)');

    const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

    const itemsPerPage = isLg ? projects.length : isSm ? 2 : 1;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProjects = projects.slice(startIndex, endIndex);

    const paginate = (newDirection: number) => {
        const newPage = (page + newDirection + totalPages) % totalPages;
        setPage([newPage, newDirection]);
    };

    return (
        <section
            id="projects"
            className="w-full px-4 sm:px-6 py-16 scroll-mt-20 relative overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 10% 20%, rgba(15, 30, 60, 0.9) 0%, rgba(5, 15, 40, 0.95) 90%)',
                boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.7)'
            }}
        >
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-blue-600 blur-[80px]"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-purple-600 blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-12 text-primary text-center relative z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    MY PROJECTS
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/4 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                </motion.h1>

                <div className="mt-12 relative min-h-[500px]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={page}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            custom={direction}
                            variants={sliderVariants}
                            initial="incoming"
                            animate="active"
                            exit="outgoing"
                        >
                            {displayedProjects.map((proj) => (
                                <ProjectCard key={proj.title} {...proj} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {!isLg && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-12">
                        <motion.button
                            onClick={() => paginate(-1)}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-neutral-700 hover:border-pink-500 transition-colors"
                        >
                            <ChevronLeft size={24} className="text-neutral-300" />
                        </motion.button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPage([index, index > page ? 1 : -1])}
                                    className={`h-2 rounded-full transition-all duration-300 ${page === index ? "w-6 bg-gradient-to-r from-pink-500 to-purple-500" : "w-2 bg-neutral-600 hover:bg-neutral-400"}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={() => paginate(1)}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-neutral-700 hover:border-pink-500 transition-colors"
                        >
                            <ChevronRight size={24} className="text-neutral-300" />
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}