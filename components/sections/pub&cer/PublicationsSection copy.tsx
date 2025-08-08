'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import PublicationCard from './PublicationCard';
import CertificationCard from './CertificationCard';
import Image from 'next/image';

// --- Data ---
const publication = {
    title: "AI-Driven Adaptive Load Balancing for Microservices",
    authors: "By Soubhik Roy",
    description: "This research introduces AI-ALB, a reinforcement learning-based system that dynamically manages traffic in cloud-native microservices environments, achieving 40% latency reduction and 30% improved resource efficiency compared to traditional methods.",
    tags: ["Reinforcement Learning", "Kubernetes", "Microservices", "Cloud Computing"],
    paperLink: "https://www.ijfmr.com/research-paper.php?id=38725",
};

const certifications = [
    {
        title: "AI Meets Load Balancing",
        issuer: "IJFMR",
        imageUrl: "/images/certificates/Research.jpg",
        certLink: "https://www.ijfmr.com/research-paper.php?id=38725"
    },
    {
        title: "Java Course",
        issuer: "Udemy",
        imageUrl: "/images/certificates/java(udemy).jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_java17-softwaredevelopment-learningjourney-activity-7248274037615808512-uiUk"
    },
    {
        title: "GFG 160-160 Days of Problem Solving",
        issuer: "Geeks For Geeks",
        imageUrl: "/images/certificates/160days_GFG.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_geeksforgeeks-dsacertification-problemsolving-activity-7325708481615872000-tVWG"
    },
    {
        title: "Graph Theory Programming Camp",
        issuer: "Aglo University",
        imageUrl: "/images/certificates/GraphTheory.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_graphtheory-algouniversity-competitiveprogramming-activity-7335570398933147648-BRZ7"
    },
    {
        title: "Freedom with AI Masterclass",
        issuer: "Freedom with AI",
        imageUrl: "/images/certificates/AI_MasterClass.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_freedomwithai-aiinnovation-continuouslearning-activity-7251647004576018432-s3rA"
    },
    {
        title: "HTML Course",
        issuer: "Infosys",
        imageUrl: "/images/certificates/HTML(Infosys).jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_html-webdevelopment-learningjourney-activity-7250507352498393088-IvOm"
    },
    {
        title: "CSS Course",
        issuer: "Hacker Rank",
        imageUrl: "/images/certificates/CSS(HackerRank).jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_css-webdevelopment-hackerrank-activity-7263585171474444289-ePbh"
    },
    {
        title: "JavaScript Course",
        issuer: "Hacker Rank",
        imageUrl: "/images/certificates/JS(hackerRank).jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_javascript-hackerrank-certification-activity-7264525348292218880-Yxbt"
    },
    {
        title: "Python Course",
        issuer: "Hacker Rank",
        imageUrl: "/images/certificates/python(HackerRank).jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_pythoncertification-codingjourney-activity-7145058318057738240-BdkK"
    },
    {
        title: "Innovations in Intelligent Systems",
        issuer: "VIT Bhopal University",
        imageUrl: "/images/certificates/InnovationsinIntelligentSystems.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_grateful-intelligentsystems-ai-activity-7296452619487645696-zTBz"
    },
    {
        title: "Adobe Hackathon",
        issuer: "UnStop",
        imageUrl: "/images/certificates/Adobe(Hackathon).jpg",
        certLink: "https://d2c-cdn-mumbai.s3.ap-south-1.amazonaws.com/lambda-pdfs/certificate-images/5a5d8e03-ee04-454d-905b-708529632ed3.pdf"
    },
    {
        title: "Health 4 Health Hackathon",
        issuer: "VIT Bhopal University",
        imageUrl: "/images/certificates/Hackathon(Health).jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_hackathon-healthtech-innovation-activity-7273524636674347009-kUpI"
    },
    {
        title: "Ninja SlayGround 2.0- Level 1",
        issuer: "Coding Ninjas",
        imageUrl: "/images/certificates/codingNinja_level1.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_ninjaslayground-codingninjas-codingchallenge-activity-7267188315273973760-fSYF"
    },
    {
        title: "Ninja SlayGround 2.0- Level 2",
        issuer: "Coding Ninjas",
        imageUrl: "/images/certificates/codingNinja_level2.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_ninjaslayground-codingninjas-achievement-activity-7269798073885732864-YYpp"
    },
    {
        title: "Ninja SlayGround 2.0- Level 3",
        issuer: "Coding Ninjas",
        imageUrl: "/images/certificates/codingNinja_level3.jpeg",
        certLink: "https://www.linkedin.com/posts/soubhik-roy07_ninjaslayground-codingninjas-codingchallenge-activity-7271963725018845184-xJ4z"
    },
];

// --- Animation Variants for Framer Motion ---
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

const PublicationSection = () => {
    const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
    const [autoScroll, setAutoScroll] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const nextCard = useCallback(() => {
        setCurrentIndex(prev => [(prev[0] + 1) % certifications.length, 1]);
    }, []);

    const prevCard = useCallback(() => {
        setCurrentIndex(prev => [(prev[0] - 1 + certifications.length) % certifications.length, -1]);
    }, []);

    const selectCard = (index: number) => {
        setAutoScroll(false);
        setCurrentIndex(prev => [index, index > prev[0] ? 1 : -1]);
    };

    useEffect(() => {
        if (!autoScroll || !isMounted) return;
        const interval = setInterval(nextCard, 3000);
        return () => clearInterval(interval);
    }, [autoScroll, nextCard, isMounted]);

    return (
        <section
            id="publications"
            className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-10 overflow-hidden"
            style={{ backgroundColor: '#0e253df1' }}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                        PUBLICATION & CERTIFICATION
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg mt-4 sm:mt-6">
                        A blend of academic contributions and skill validations
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row w-full items-stretch gap-6 lg:gap-8">
                    {/* Left Side: Publication */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="w-full max-w-xl h-full min-h-[400px] md:min-h-[500px] overflow-y-auto">
                            <PublicationCard {...publication} />
                        </div>
                    </div>

                    {/* Vertical Divider - Visible only on lg screens */}
                    <div className="hidden lg:flex items-center justify-center mx-2">
                        <div className="w-px h-[80%] bg-gradient-to-b from-transparent via-pink-500 to-transparent"></div>
                    </div>

                    {/* Horizontal Divider - Visible only on smaller screens */}
                    <div className="lg:hidden flex justify-center my-2 w-full">
                        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                    </div>

                    {/* Right Side: Certification Carousel */}
                    <div className="w-full lg:w-1/2 mt-4 lg:mt-0 flex flex-col items-center">
                        <div className="relative w-full max-w-xl h-[60vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
                            <AnimatePresence initial={false} custom={direction}>
                                {isMounted && (
                                    <CertificationCard
                                        key={currentIndex}
                                        title={certifications[currentIndex].title}
                                        issuer={certifications[currentIndex].issuer}
                                        imageUrl={certifications[currentIndex].imageUrl}
                                        certLink={certifications[currentIndex].certLink}
                                        variants={sliderVariants}
                                        custom={direction}
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 w-full">
                            <motion.button
                                onClick={() => { setAutoScroll(false); prevCard(); }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(236, 72, 153, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-neutral-700 hover:border-pink-500 transition-colors"
                            >
                                <ChevronLeft size={20} className="text-neutral-300 hover:text-pink-400 transition-colors" />
                            </motion.button>

                            <div className="flex gap-1 sm:gap-2">
                                {certifications.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => selectCard(index)}
                                        whileHover={{ scale: 1.2 }}
                                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                            ? "w-6 bg-gradient-to-r from-pink-500 to-purple-500"
                                            : "w-2 bg-neutral-600 hover:bg-neutral-400"
                                            }`}
                                    />
                                ))}
                            </div>

                            <motion.button
                                onClick={() => { setAutoScroll(false); nextCard(); }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(236, 72, 153, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-neutral-700 hover:border-pink-500 transition-colors"
                            >
                                <ChevronRight size={20} className="text-neutral-300 hover:text-pink-400 transition-colors" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublicationSection;