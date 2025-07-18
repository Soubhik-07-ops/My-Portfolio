// components/AboutCard.tsx
'use client'; // This component will handle client-side interactivity (hover)
import React, { useState } from 'react';

interface AboutCardProps {
    title: string;
    children: React.ReactNode;
    initialBgClass?: string; // Tailwind class for initial background (e.g., 'bg-transparent')
    hoverBgClass?: string;   // Tailwind class for hover background (e.g., 'bg-gray-800' or 'bg-white')
    textColorClass?: string; // Tailwind class for text color
    hoverTextColorClass?: string; // Tailwind class for text color on hover
    className?: string; // Additional classes for the outer container
}

const AboutCard: React.FC<AboutCardProps> = ({
    title,
    children,
    initialBgClass = 'bg-transparent', // Default to transparent
    hoverBgClass = 'bg-gray-800 dark:bg-white', // Default hover: dark bg in dark mode, white in light
    textColorClass = 'text-gray-900 dark:text-gray-200', // Default text color
    hoverTextColorClass = 'text-white dark:text-gray-900', // Default hover text color
    className = '',
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        p-8 rounded-lg shadow-lg border border-gray-700/50 dark:border-gray-300/50 backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${isHovered ? hoverBgClass : initialBgClass}
        ${isHovered ? hoverTextColorClass : textColorClass}
        ${className}
        relative z-10 {/* Ensure cards are above particles */}
      `}
        >
            <h2 className="text-2xl font-semibold mb-4 text-primary">
                {title}
            </h2>
            <div>
                {children}
            </div>
        </div>
    );
};

export default AboutCard;