// components/TechIcon.tsx
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
    // Calculate gradient color based on percentage
    const getProgressColor = (percent: number) => {
        if (percent >= 80) return 'from-green-400 to-blue-500';
        if (percent >= 60) return 'from-yellow-400 to-green-500';
        return 'from-red-400 to-yellow-500';
    };

    return (
        <motion.div
            className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 ${isHighlighted
                ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/20 shadow-lg shadow-blue-500/20 border border-blue-500/30'
                : 'bg-gray-800/30 hover:bg-gray-700/50'
                }`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: isHighlighted ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                // MODIFIED: Responsive width and height for the icon container
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3"
                animate={{
                    scale: isHighlighted ? 1.15 : 1,
                }}
            >
                <Image
                    src={iconPath}
                    alt={name}
                    fill // Use 'fill' to make the image size relative to its parent div
                    className="object-contain"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px" // Inform Next.js for better optimization
                />
                {isHighlighted && (
                    <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                        }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </motion.div>

            <h3 className="text-sm sm:text-base font-medium text-center mb-1 sm:mb-2">{name}</h3>

            <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(percentage)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
                />
            </div>

            <motion.span
                className="text-xs sm:text-sm mt-1 text-gray-300"
                animate={{
                    color: isHighlighted ? '#ffffff' : '#d1d5db',
                    scale: isHighlighted ? 1.1 : 1
                }}
            >
                {percentage}%
            </motion.span>
        </motion.div>
    );
};

export default TechIcon;