"use client";
import ProjectCard from "@/components/ProjectCard";
import { motion, Variants } from "framer-motion";

const projects = [
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

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function ProjectsSection() {
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
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16 text-primary text-center relative"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    MY PROJECTS
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/4 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                </motion.h1>

                <motion.div
                    // --- UPDATED: 1 col on mobile, 2 on small screens, 3 on large screens ---
                    className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {projects.map((proj, i) => (
                        <motion.div key={i} variants={itemVariants} className="w-full">
                            <ProjectCard {...proj} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}