'use client';

import { useState, useEffect, Key } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FiAward, FiCode, FiCalendar, FiCheckCircle, FiStar, FiTrendingUp } from 'react-icons/fi';
import { FaCrown, FaMedal, FaTrophy } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- INTERFACES & CONSTANTS ---
interface LeetCodeData {
    profile: {
        username: string;
        submitStats: {
            acSubmissionNum: { difficulty: string; count: number; submissions: number; }[];
        };
        profile: { ranking: number; };
        badges: any[];
        streak: number;
    };
    languages: { languageName: string; problemsSolved: number; }[];
    calendar: string;
}

const HARDCODED_BADGES = [
    { id: 'annual-200', displayName: '200 Days Badge 2025', imageUrl: '/images/badges/200-days-badge.png', date: '2025-07-26' },
    { id: 'annual-100', displayName: '100 Days Badge 2025', imageUrl: '/images/badges/100-days-badge.png', date: '2025-04-11' },
    { id: 'annual-50', displayName: '50 Days Badge 2025', imageUrl: '/images/badges/50-days-badge.png', date: '2025-02-20' },
    { id: 'daily-jul', displayName: 'Jul Badge', imageUrl: '/images/badges/july-2025.png', date: '2025-07-31' },
    { id: 'daily-jun', displayName: 'Jun Badge', imageUrl: '/images/badges/june-2025.png', date: '2025-06-30' },
    { id: 'daily-may', displayName: 'May Badge', imageUrl: '/images/badges/may-2025.png', date: '2025-05-31' },
    { id: 'daily-apr', displayName: 'Apr Badge', imageUrl: '/images/badges/april-2025.png', date: '2025-04-30' },
    { id: 'daily-mar', displayName: 'Mar Badge', imageUrl: '/images/badges/march-2025.png', date: '2025-03-31' },
    { id: 'daily-feb', displayName: 'Feb Badge', imageUrl: '/images/badges/february-2025.png', date: '2025-02-28' },
    { id: 'daily-jan', displayName: 'Jan Badge', imageUrl: '/images/badges/january-2025.png', date: '2025-01-31' },
    { id: 'daily-dec', displayName: 'Dec Badge', imageUrl: '/images/badges/december-2024.png', date: '2024-12-31' },
];

interface DisplayBadge {
    id: string;
    displayName: string;
    imageUrl: string;
    date: string;
}

const COLORS = {
    Easy: '#4ade80',
    Medium: '#fbbf24',
    Hard: '#f87171',
    Card: '#1e293b',
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
} as const;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 }
    },
} as const;

// --- HELPER COMPONENTS ---
const AnimatedCounter = ({ value }: { value: number }) => {
    const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 20 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString());
    useEffect(() => { spring.set(value); }, [spring, value]);
    return <motion.span>{display}</motion.span>;
};

const DifficultyBadge = ({ difficulty, count }: { difficulty: string; count: number }) => {
    const bgColor = difficulty === 'Easy' ? 'bg-green-500/20' : difficulty === 'Medium' ? 'bg-yellow-500/20' : 'bg-red-500/20';
    const textColor = difficulty === 'Easy' ? 'text-green-400' : difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400';
    return (
        <motion.div
            className={`flex items-center justify-center rounded-full px-4 py-1 ${bgColor} ${textColor}`}
            whileHover={{ scale: 1.05 }}
        >
            <span className="font-medium">{difficulty}</span>
            <span className="ml-2 font-bold">{count}</span>
        </motion.div>
    );
};

const MarqueeBadge = ({ badge }: { badge: DisplayBadge }) => (
    <motion.div
        className="flex-shrink-0 w-72 flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-600/50 hover:border-blue-400/50 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
    >
        <div className="relative w-14 h-14 flex-shrink-0">
            <Image
                src={badge.imageUrl || '/images/badges/default-badge.png'}
                alt={badge.displayName}
                fill
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 3vw"
                className="object-contain drop-shadow-lg"
            />
        </div>
        <div className="overflow-hidden">
            <p className="font-bold text-white text-md truncate flex items-center">
                {badge.displayName}
                {badge.displayName.includes('200') && <FaTrophy className="ml-2 text-yellow-400" />}
                {badge.displayName.includes('100') && <FaMedal className="ml-2 text-gray-300" />}
            </p>
            <p className="text-xs text-gray-400 mt-1 flex items-center">
                <FiCalendar className="mr-1" /> {badge.date}
            </p>
        </div>
    </motion.div>
);

const AchievementsMarquee = ({ badges }: { badges: DisplayBadge[] }) => {
    if (!badges || badges.length === 0) return null;
    const duplicatedBadges = [...badges, ...badges];
    return (
        <div className="relative w-full overflow-hidden h-24">
            <motion.div
                className="absolute left-0 flex gap-6 pr-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ ease: 'linear', duration: badges.length * 3, repeat: Infinity }}
            >
                {duplicatedBadges.map((badge, index) => (
                    <MarqueeBadge key={`${badge.id}-${index}`} badge={badge} />
                ))}
            </motion.div>
        </div>
    );
};

const GlowingBorderCard = ({ children }: { children: React.ReactNode }) => (
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 h-full">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 h-full">
            {children}
        </div>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const LeetCodeDashboard = () => {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heatmapValues, setHeatmapValues] = useState<{ date: string; count: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(res => setTimeout(res, 1500));
                const response = await fetch(`/api/leetcode?username=Soubhik_roy&timestamp=${new Date().getTime()}`);
                if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
                const result = await response.json();
                if (!result.profile) throw new Error("Profile data not found in API response.");

                const mergedData = { ...result, profile: { ...result.profile, streak: 263 } };
                setData(mergedData);

                if (result.calendar) {
                    const calendarData = JSON.parse(result.calendar);
                    const submissionDates = Object.keys(calendarData);
                    if (submissionDates.length === 0) {
                        setHeatmapValues([]);
                        return;
                    }

                    // Create a full year date range
                    const today = new Date();
                    const startDate = new Date();
                    startDate.setFullYear(today.getFullYear() - 1);
                    startDate.setDate(startDate.getDate() + 1);

                    const dateMap = new Map<string, number>();
                    Object.entries(calendarData).forEach(([timestamp, count]) => {
                        const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                        dateMap.set(date, count as number);
                    });

                    const fullYearData: { date: string; count: number }[] = [];
                    for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
                        const dateStr = d.toISOString().split('T')[0];
                        fullYearData.push({
                            date: dateStr,
                            count: dateMap.get(dateStr) || 0,
                        });
                    }
                    setHeatmapValues(fullYearData);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-screen z-10 relative bg-gradient-to-br from-gray-900 to-gray-800">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, type: 'tween', ease: 'easeInOut' }}
                className="p-5 bg-blue-500/10 rounded-full"
            >
                <div className="p-4 bg-blue-500/20 rounded-full">
                    <FiCode className="text-blue-300 text-4xl" />
                </div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center text-blue-200 font-medium"
            >
                Loading your LeetCode stats...
            </motion.p>
        </div>
    );

    if (error || !data) return (
        <div id="leetcode-error" className="py-16 px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto my-10 bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 rounded-xl p-8 text-center z-10 relative overflow-hidden"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent rounded-xl blur-sm"></div>
                <h3 className="text-2xl font-bold text-red-300 relative">Failed to Load LeetCode Stats</h3>
                <p className="text-red-200 mt-2 relative">Error: {error || 'An unknown error occurred'}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all relative"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                    <FiTrendingUp className="inline ml-2" />
                </motion.button>
            </motion.div>
        </div>
    );

    const { profile, languages } = data;
    const solved = profile.submitStats.acSubmissionNum;
    const allSolved = solved.find(p => p.difficulty === "All")?.count || 0;
    const easySolved = solved.find(p => p.difficulty === "Easy")?.count || 0;
    const mediumSolved = solved.find(p => p.difficulty === "Medium")?.count || 0;
    const hardSolved = solved.find(p => p.difficulty === "Hard")?.count || 0;

    const difficultyData = [
        { name: 'Easy', solved: easySolved, total: 888, color: COLORS.Easy },
        { name: 'Medium', solved: mediumSolved, total: 1893, color: COLORS.Medium },
        { name: 'Hard', solved: hardSolved, total: 859, color: COLORS.Hard }
    ];

    const pieData = difficultyData.map(d => ({ name: d.name, value: d.solved, color: d.color }));
    const languageData = languages.sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 5);

    return (
        <section
            id="leetcode"
            className="relative min-h-screen z-10 bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 sm:px-6 md:px-8 lg:px-10"
        >
            <div className="max-w-7xl mx-auto relative z-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-12 text-primary text-center relative z-20"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        LEETCODE PROFILE
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/4 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-full"></div>
                    </motion.h1>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start mb-8">
                        {/* Left Column */}
                        <motion.div
                            className="lg:col-span-2 space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <GlowingBorderCard>
                                    <div className="text-center">
                                        <motion.div
                                            className="inline-block mb-4"
                                            whileHover={{ rotate: 5 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <div className="w-24 h-24 rounded-full border-4 border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto overflow-hidden">
                                                <FiCode className="text-3xl text-blue-400" />
                                            </div>
                                        </motion.div>
                                        <h1 className="text-3xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                                            {profile.username}
                                        </h1>
                                        <p className="text-blue-300 font-medium mt-1 flex items-center justify-center">
                                            <FaCrown className="mr-2 text-yellow-400" />
                                            Rank <span className="text-white mx-1">#</span>
                                            <AnimatedCounter value={profile.profile.ranking} />
                                        </p>
                                        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                                            <div className="text-lg flex items-center">
                                                <FiTrendingUp className="mr-2 text-orange-400" />
                                                <span className="font-bold text-orange-400">
                                                    <AnimatedCounter value={profile.streak} />
                                                </span> day streak
                                            </div>
                                            <div className="text-lg flex items-center">
                                                <FiCheckCircle className="mr-2 text-blue-400" />
                                                <span className="font-bold text-blue-400">
                                                    <AnimatedCounter value={allSolved} />
                                                </span> Solved
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-center gap-2">
                                            <DifficultyBadge difficulty="Easy" count={easySolved} />
                                            <DifficultyBadge difficulty="Medium" count={mediumSolved} />
                                            <DifficultyBadge difficulty="Hard" count={hardSolved} />
                                        </div>
                                    </div>
                                </GlowingBorderCard>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <GlowingBorderCard>
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <FiCode className="mr-2 text-blue-400" />
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                                            Top Languages
                                        </span>
                                    </h2>
                                    <div className="space-y-4">
                                        {languageData.map((lang, index) => (
                                            <motion.div
                                                key={lang.languageName}
                                                className="flex justify-between items-center text-gray-300"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                            >
                                                <div className="flex items-center">
                                                    <span className="w-6 text-center mr-2">
                                                        {index === 0 ? <FaTrophy className="text-yellow-400" /> : `#${index + 1}`}
                                                    </span>
                                                    <span>{lang.languageName}</span>
                                                </div>
                                                <span className="font-mono text-white bg-gray-700/50 px-3 py-1 rounded-md text-sm">
                                                    {lang.problemsSolved}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </GlowingBorderCard>
                            </motion.div>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            className="lg:col-span-3 space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <GlowingBorderCard>
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                        <FiCheckCircle className="mr-2 text-green-400" />
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300">
                                            Problems Solved
                                        </span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="h-64 relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={3} dataKey="value" cornerRadius={5}>
                                                        {pieData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: COLORS.Card, borderColor: '#374151', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }} />
                                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white">
                                                        <AnimatedCounter value={allSolved} />
                                                    </text>
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <motion.div
                                                className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                            >
                                                <div className="w-40 h-40 rounded-full border-2 border-dashed border-blue-500/20"></div>
                                            </motion.div>
                                        </div>
                                        <div className="space-y-6">
                                            {difficultyData.map((item, index) => (
                                                <motion.div
                                                    key={item.name}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                >
                                                    <div className="flex justify-between mb-2 text-gray-300">
                                                        <span className="flex items-center">
                                                            {item.name}
                                                            {index === 0 && <FiStar className="ml-1 text-yellow-400 text-xs" />}
                                                        </span>
                                                        <span className="font-medium text-white">
                                                            {item.solved} <span className="text-gray-500">/ {item.total}</span>
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                                                        <motion.div
                                                            className="h-2.5 rounded-full relative"
                                                            style={{ backgroundColor: item.color }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(item.solved / item.total) * 100}%` }}
                                                            transition={{ duration: 1, type: 'spring' }}
                                                        >
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </GlowingBorderCard>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <GlowingBorderCard>
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <FiCalendar className="mr-2 text-teal-400" />
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-300">
                                            Submission Activity
                                        </span>
                                    </h2>
                                    <div className="heatmap-container w-full overflow-x-auto p-4">
                                        <div className="grid grid-rows-7 grid-flow-col gap-1.5">
                                            {heatmapValues.length > 0 ? (
                                                heatmapValues.map((day, index) => {
                                                    const totalDays = heatmapValues.length;
                                                    const currentColumn = Math.floor(index / 7);
                                                    const totalColumns = Math.ceil(totalDays / 7);

                                                    let horizontalPositionClass = 'left-1/2 -translate-x-1/2';
                                                    if (currentColumn < 2) {
                                                        horizontalPositionClass = 'left-0';
                                                    } else if (currentColumn > totalColumns - 3) {
                                                        horizontalPositionClass = 'right-0';
                                                    }

                                                    const isTopTwoRows = index % 7 < 2;
                                                    const verticalPositionClass = isTopTwoRows ? 'top-full mt-2' : 'bottom-full mb-2';

                                                    const intensity = Math.min(day.count / 5, 1);
                                                    const color = day.count > 0 ? `rgba(56, 189, 248, ${0.2 + intensity * 0.8})` : '#374151';

                                                    return (
                                                        <div key={index} className="group relative">
                                                            <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: color }} />
                                                            <div className={`absolute w-max px-2 py-1 bg-gray-900 border border-gray-600 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg ${verticalPositionClass} ${horizontalPositionClass}`}>
                                                                {day.count} submission(s) on {new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-gray-400 col-span-full">Loading heatmap data...</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center mt-2 text-xs text-gray-400 px-4">
                                        <span>Less</span>
                                        <div className="flex gap-1 mx-2">
                                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#374151' }}></div>
                                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(56, 189, 248, 0.3)' }}></div>
                                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(56, 189, 248, 0.6)' }}></div>
                                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(56, 189, 248, 1.0)' }}></div>
                                        </div>
                                        <span>More</span>
                                    </div>
                                </GlowingBorderCard>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                        <GlowingBorderCard>
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <FiAward className="mr-3 text-yellow-400" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
                                    Achievements
                                </span>
                            </h2>
                            <AchievementsMarquee badges={HARDCODED_BADGES} />
                        </GlowingBorderCard>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCodeDashboard;