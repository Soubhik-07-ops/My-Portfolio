'use client';
import React, { useState, useEffect, useMemo } from 'react';
import TechIcon from '@/components/TechIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom device detection with animation preferences
function useDeviceType() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}

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
const ITEMS_PER_PAGE = 9;

// Fixed spring animation config with proper typing
const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
};

export default function TechStackSection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const isMobile = useDeviceType();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const filteredSkills = allSkills.filter(skill => skill.category.includes(activeCategory));
    const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
    const paginatedSkills = filteredSkills.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handleCategoryChange = (category: string) => {
        if (category === activeCategory || isAnimating) return;
        setIsAnimating(true);
        setActiveCategory(category);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const navigatePage = (direction: 'next' | 'prev') => {
        if (isAnimating) return;
        setIsAnimating(true);
        direction === 'next'
            ? setCurrentPage(prev => (prev + 1) % totalPages)
            : setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
        setTimeout(() => setIsAnimating(false), 400);
    };

    // Original background bubbles logic from your first version
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

    return (
        <section
            id="tech-stack"
            className="relative min-h-screen py-16 px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 overflow-hidden"
            style={{ backgroundColor: '#0e253df1', position: 'relative', zIndex: 10 }}
        >
            {/* Original background bubbles from your first version */}
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

            <div className="max-w-6xl mx-auto px-0 sm:px-0 relative z-10">
                {/* Title with subtle animation */}
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-12 text-primary text-center relative z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    TECH STACK
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/4 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                </motion.h1>

                {/* Category buttons with magnetic hover effect */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(category => (
                        <motion.button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`relative px-5 py-2 rounded-full text-sm font-medium ${activeCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            whileHover={{
                                y: -2,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                {isMobile ? (
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeCategory}-${currentPage}`}
                                className="grid grid-cols-3 gap-4"
                                initial={{ opacity: 0, x: currentPage > 0 ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: currentPage > 0 ? -50 : 50 }}
                                transition={{ duration: 0.4 }}
                            >
                                {paginatedSkills.map(skill => (
                                    <TechIcon
                                        key={skill.name}
                                        name={skill.name}
                                        iconPath={skill.iconPath}
                                        percentage={skill.percentage}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {totalPages > 1 && (
                            <motion.div
                                className="flex items-center justify-center gap-6 mt-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.button
                                    onClick={() => navigatePage('prev')}
                                    className="p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700"
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                        borderColor: '#3b82f6'
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronLeft className="text-gray-300" size={20} />
                                </motion.button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }).map((_, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={() => setCurrentPage(idx)}
                                            className={`w-3 h-3 rounded-full transition-colors ${currentPage === idx ? 'bg-blue-500' : 'bg-gray-600'
                                                }`}
                                            whileHover={{ scale: 1.3 }}
                                            transition={{ type: 'spring', stiffness: 500 }}
                                        />
                                    ))}
                                </div>

                                <motion.button
                                    onClick={() => navigatePage('next')}
                                    className="p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700"
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                        borderColor: '#3b82f6'
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronRight className="text-gray-300" size={20} />
                                </motion.button>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: index * 0.03,
                                    ...springConfig
                                }}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <TechIcon
                                    name={skill.name}
                                    iconPath={skill.iconPath}
                                    percentage={skill.percentage}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}