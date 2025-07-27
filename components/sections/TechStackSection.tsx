// techstacksection.tsx
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import TechIcon from '@/components/TechIcon';
import { motion, Variants } from 'framer-motion';

interface Skill {
    name: string;
    iconPath: string;
    percentage: number;
    category: string[];
}

const allSkills: Skill[] = [
    // Frontend
    { name: 'HTML5', iconPath: '/images/tech/html.png', percentage: 95, category: ['All', 'Frontend'] },
    { name: 'CSS3', iconPath: '/images/tech/css.png', percentage: 90, category: ['All', 'Frontend'] },
    { name: 'JavaScript', iconPath: '/images/tech/javascript.png', percentage: 85, category: ['All', 'Frontend'] },
    { name: 'TypeScript', iconPath: '/images/tech/typescript.png', percentage: 80, category: ['All', 'Frontend'] },
    { name: 'React.js', iconPath: '/images/tech/reactjs.png', percentage: 85, category: ['All', 'Frontend'] },
    { name: 'Next.js', iconPath: '/images/tech/Next.js.png', percentage: 80, category: ['All', 'Frontend'] },
    { name: 'Tailwind CSS', iconPath: '/images/tech/tailwind.png', percentage: 90, category: ['All', 'Frontend'] },
    // Backend
    { name: 'Node.js', iconPath: '/images/tech/nodejs.png', percentage: 75, category: ['All', 'Backend'] },
    { name: 'Express.js', iconPath: '/images/tech/express.png', percentage: 70, category: ['All', 'Backend'] },
    { name: 'Spring Boot', iconPath: '/images/tech/springboot.png', percentage: 70, category: ['All', 'Backend'] },
    { name: 'Flask', iconPath: '/images/tech/flask.png', percentage: 65, category: ['All', 'Backend'] },
    { name: 'FastAPI', iconPath: '/images/tech/FastAPI.png', percentage: 60, category: ['All', 'Backend'] },
    { name: 'GraphQL', iconPath: '/images/tech/graphQL.png', percentage: 50, category: ['All', 'Backend'] },
    // Databases
    { name: 'PostgreSQL', iconPath: '/images/tech/postgresql.png', percentage: 75, category: ['All', 'Backend'] },
    { name: 'MongoDB', iconPath: '/images/tech/mongodb.png', percentage: 65, category: ['All', 'Backend'] },
    { name: 'Firebase', iconPath: '/images/tech/firebase.png', percentage: 55, category: ['All', 'Backend'] },
    // AI/ML
    { name: 'TensorFlow', iconPath: '/images/tech/tensorFlow.png', percentage: 60, category: ['All', 'AI/ML'] },
    { name: 'PyTorch', iconPath: '/images/tech/PyTorch.png', percentage: 50, category: ['All', 'AI/ML'] },
    // Languages
    { name: 'Java', iconPath: '/images/tech/java.png', percentage: 80, category: ['All', 'Backend'] },
    { name: 'Python', iconPath: '/images/tech/python.png', percentage: 90, category: ['All', 'Backend', 'AI/ML'] },
    // DevOps/Tools
    { name: 'Docker', iconPath: '/images/tech/docker.png', percentage: 70, category: ['All', 'Devops'] },
    { name: 'Kubernetes', iconPath: '/images/tech/kubernetes.png', percentage: 60, category: ['All', 'Devops'] },
    { name: 'AWS S3', iconPath: '/images/tech/aws.png', percentage: 50, category: ['All', 'Devops'] },
    { name: 'Azure', iconPath: '/images/tech/azure.png', percentage: 40, category: ['All', 'Devops'] },
    { name: 'Git', iconPath: '/images/tech/git.png', percentage: 85, category: ['All', 'Devops'] },
    { name: 'GitHub Actions', iconPath: '/images/tech/GitHubActions.png', percentage: 70, category: ['All', 'Devops'] },
    { name: 'Jest', iconPath: '/images/tech/Jest.png', percentage: 60, category: ['All', 'Frontend'] },
];

const categories = ['All', 'Frontend', 'Backend', 'Devops', 'AI/ML'];

export default function TechStackSection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const bubblePositions = useMemo(() => {
        return Array(20).fill(0).map(() => ({
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: Math.random() * 100,
            top: Math.random() * 100,
            opacity: 0.1,
            scale: Math.random() * 0.5 + 0.5
        }));
    }, []);

    const filteredSkills = allSkills.filter(skill =>
        skill.category.includes(activeCategory)
    );

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // --- UPDATED BUTTON VARIANTS FOR GRADIENT BACKGROUND ---
    const buttonVariants: Variants = {
        rest: { // Default state for inactive buttons
            scale: 1,
            // Applying the red-pink-blue gradient
            background: "linear-gradient(to right, #EF4444, #EC4899, #3B82F6)", // red-500, pink-500, blue-500
            color: '#FFFFFF', // White text for contrast on gradient
            boxShadow: "0px 0px 5px rgba(0,0,0,0.3)", // Subtle shadow
            transition: { duration: 0.3 }
        },
        hover: {
            scale: 1.05,
            // Slightly intensified or shifted gradient on hover
            background: "linear-gradient(to right, #dc2626, #db2777, #2563eb)", // slightly darker shades
            boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.7)", // More prominent blue glow on hover
            color: '#FFFFFF',
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        },
        selected: {
            scale: 1.1, // Slightly larger when selected
            // Distinct gradient for the selected button
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", // Blue to Purple gradient
            color: "#FFFFFF",
            boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.7)", // Stronger purple glow
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <section
            id="tech-stack"
            className="relative min-h-screen py-16 px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 overflow-hidden" // Added responsive horizontal padding
            style={{
                backgroundColor: '#0e253df1',
                position: 'relative',
                zIndex: 10,
            }}
        >
            {/* Animated background elements - only render on client */}
            {isMounted && (
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        {bubblePositions.map((pos, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-blue-500"
                                initial={pos}
                                animate={{
                                    y: [0, Math.random() * 100 - 50],
                                    x: [0, Math.random() * 100 - 50],
                                    transition: {
                                        duration: Math.random() * 10 + 10,
                                        repeat: Infinity,
                                        repeatType: 'reverse'
                                    }
                                }}
                                style={{
                                    width: `${pos.width}px`,
                                    height: `${pos.height}px`,
                                    left: `${pos.left}%`,
                                    top: `${pos.top}%`,
                                    opacity: pos.opacity,
                                    scale: pos.scale
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-0 sm:px-0 relative z-10"> {/* Changed this to px-0 as outer section handles it */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 text-primary text-center relative z-20" // Adjusted heading sizes and margins
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    TECH STACK
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/4 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                </motion.h1>

                {/* Category Filter Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center mb-10 sm:mb-12 gap-2 sm:gap-3 md:gap-4 relative z-10" // Adjusted gap and margin-bottom
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map(category => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className="custom-radius px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base font-medium relative overflow-hidden" // Adjusted button padding and font size
                            variants={buttonVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            animate={activeCategory === category ? "selected" : "rest"}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Tech Icons Grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 relative z-10" // Adjusted grid gap and added xl breakpoint for more columns
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={item}
                            whileHover={{
                                scale: 1.1,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                        >
                            <TechIcon
                                name={skill.name}
                                iconPath={skill.iconPath}
                                percentage={skill.percentage}
                                isHighlighted={hoveredSkill === skill.name}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}