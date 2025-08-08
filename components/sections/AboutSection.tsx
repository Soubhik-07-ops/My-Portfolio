"use client";

import AboutCard from "@/components/AboutCard";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Timeline } from "@/components/ui/timeline"; // Import the Timeline component

export default function AboutSection() {

    // Data for the Timeline component (Education and Experience based on screenshot)
    const educationTimelineData = [
        {
            title: "Sep 2023 - Present",
            content: (
                <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        Undergraduate Student
                    </h3>
                    <p className="text-base text-neutral-700 dark:text-neutral-300">
                        VIT Bhopal University - Full-time
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Bhopal, Madhya Pradesh, India
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        1 yr 11 mos
                    </p>
                </div>
            ),
        },
        {
            title: "May 2025 - Jun 2025",
            content: (
                <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        Summer Research Intern
                    </h3>
                    <p className="text-base text-neutral-700 dark:text-neutral-300">
                        Department of Computer Science and Engineering, IIT(ISM) Dhanbad - Internship
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Dhanbad, Jharkhand, India - On-site
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        2 mos
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        <strong className="text-primary-light dark:text-primary">Skills:</strong> Genetic Algorithms, Algorithm Optimization, etc.
                    </p>
                </div>
            ),
        },
        {
            title: "Oct 2024 - Nov 2024",
            content: (
                <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        Web Developer
                    </h3>
                    <p className="text-base text-neutral-700 dark:text-neutral-300">
                        CodSoft - Internship
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Remote
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        2 mos
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        <strong className="text-primary-light dark:text-primary">Skills:</strong> React.js, Tailwind CSS, etc.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section
            id="about"
            className="w-full px-4 sm:px-6 py-16 scroll-mt-20 relative overflow-hidden min-h-screen"
            style={{
                background: 'radial-gradient(circle at 10% 20%, rgba(15, 30, 60, 0.9) 0%, rgba(5, 15, 40, 0.95) 90%)',
                boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.7)'
            }}
        >
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-blue-600 blur-[80px]"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-purple-600 blur-[100px]"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-12 text-primary text-center relative z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    ABOUT ME
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/4 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Enhanced Image with animated border and "move out" on hover */}
                    <motion.div
                        className="relative z-10 flex justify-center md:justify-end"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 shadow-2xl border-4 border-primary group">
                            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/30 transition-all duration-500 animate-spin-slow" style={{ borderImage: 'linear-gradient(45deg, #3B82F6, #EC4899, #10B981) 1' }}></div>
                            <Image
                                src="/images/soubhik.png"
                                alt="Soubhik Roy"
                                width={320}
                                height={320}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" // Adjusted for "move out" effect
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 rounded-full mix-blend-overlay"></div>
                        </div>
                    </motion.div>

                    {/* Enhanced About Card with improved hover effect */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <AboutCard
                            title="Hi There 👋"
                            // Adjusted hoverBgClass for better contrast with light text
                            hoverBgClass="hover:bg-gradient-to-br from-blue-900 to-purple-900"
                            initialBgClass="bg-black/40 dark:bg-gray-800/60 backdrop-blur-sm" // Slightly darker initial background for better contrast
                            textColorClass="text-gray-200 dark:text-gray-200" // Ensure text remains visible
                            hoverTextColorClass="group-hover:text-white" // Text color on hover
                            className="group transition-all duration-500 border border-transparent hover:border-blue-400/50 hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.2)]"
                        >
                            <p className="text-lg mb-6 leading-relaxed">
                                I'm <strong className="text-primary font-semibold">Soubhik Roy</strong>, a passionate Computer Science student at VIT Bhopal, currently exploring full-stack development and AI-powered systems. I've built scalable platforms, published research, and worked with IIT Dhanbad on smart EV-routing solutions.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base mb-6">
                                <p><strong>Name:</strong> Soubhik Roy</p>
                                <p><strong>Email:</strong> soubhik0727@gmail.com</p>
                                <p><strong>Phone:</strong> +91 9835518101</p>
                                <p><strong>Twitter:</strong> @soubhik0727</p>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <motion.a
                                    href="/resume.pdf"
                                    download
                                    className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-primary/20 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    DOWNLOAD CV
                                </motion.a>
                                <div className="flex gap-10 ml-auto mt-3">
                                    <a href="https://github.com/Soubhik-07-ops"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-primary transition-colors text-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/soubhik-roy07/"
                                        target="_blank"
                                        rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors text-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a href="https://x.com/soubhik0727"
                                        target="_blank"
                                        rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors text-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </AboutCard>
                    </motion.div>
                </div>

                {/* Education and Experience Section with Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mb-5 mt-10"
                >
                    <div
                        className="rounded-lg p-6 bg-black/40 dark:bg-white/10 backdrop-blur-sm transition-all duration-500
                                    border border-transparent hover:border-blue-400/50 hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.2)]
                                    group"
                    >
                        <Timeline data={educationTimelineData} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}