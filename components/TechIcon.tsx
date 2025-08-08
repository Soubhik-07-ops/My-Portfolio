import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TechIconProps {
    name: string;
    iconPath: string;
    percentage: number;
    isHighlighted?: boolean;
}

const TechIcon: React.FC<TechIconProps> = ({
    name,
    iconPath,
    percentage,
    isHighlighted = false
}) => {
    const getColorClass = () => {
        if (percentage >= 85) return 'from-emerald-400 to-cyan-500';
        if (percentage >= 70) return 'from-amber-400 to-emerald-500';
        if (percentage >= 50) return 'from-orange-400 to-amber-500';
        return 'from-rose-400 to-orange-500';
    };

    return (
        <motion.div
            className={`flex flex-col items-center p-5 rounded-xl border border-transparent transition-all ${isHighlighted
                    ? 'bg-gray-800/50 backdrop-blur-sm shadow-lg border-gray-700'
                    : 'bg-gray-900/50 hover:bg-gray-800/60'
                }`}
            whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.2)'
            }}
            animate={{
                scale: isHighlighted ? 1.05 : 1,
                borderColor: isHighlighted ? 'rgba(59, 130, 246, 0.3)' : 'transparent'
            }}
            transition={springConfig}
        >
            <motion.div
                className="relative w-14 h-14 mb-4"
                animate={{
                    scale: isHighlighted ? 1.15 : 1
                }}
                transition={springConfig}
            >
                <Image
                    src={iconPath}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 56px, 64px"
                />
                {isHighlighted && (
                    <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                    />
                )}
            </motion.div>

            <h3 className="text-sm font-medium text-center mb-3 text-gray-100">
                {name}
            </h3>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getColorClass()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                        delay: 0.3,
                        duration: 1,
                        type: 'spring',
                        damping: 10
                    }}
                />
            </div>

            <motion.span
                className="text-xs font-mono text-gray-400"
                animate={{
                    color: isHighlighted ? '#ffffff' : '#9ca3af',
                    scale: isHighlighted ? 1.1 : 1
                }}
            >
                {percentage}% mastery
            </motion.span>
        </motion.div>
    );
};

const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
};

export default TechIcon;