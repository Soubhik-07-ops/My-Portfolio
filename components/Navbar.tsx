'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#publications', label: 'Publications' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string>('home')
    const [scrolled, setScrolled] = useState(false)
    const [isHeroVisible, setIsHeroVisible] = useState(true)

    const navbarRef = useRef<HTMLElement>(null)

    useEffect(() => {
        // Force scroll to home on page load/reload
        const scrollToHomeOnLoad = () => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                // Use a slight delay to ensure all content is rendered before scrolling
                // This can help prevent "jumping" if images/dynamic content are loading
                setTimeout(() => {
                    homeSection.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay
            }
        };
        scrollToHomeOnLoad();

        const sectionIds = navItems.map(item => item.href.replace('#', ''))
        let navbarHeight = navbarRef.current?.offsetHeight || 80;

        const handleScroll = () => {
            navbarHeight = navbarRef.current?.offsetHeight || 80;
            // Define an "activation point" in the viewport, e.g., 20% from top
            // This is more robust than a fixed pixel offset
            const activationPoint = window.innerHeight * 0.25; // 25% down the viewport

            let foundActiveSection = 'home'; // Default to home if nothing else is active

            // Iterate through sections from bottom to top
            // This ensures the highest visible section (closest to top of viewport) is prioritized
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                const section = document.getElementById(id);

                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Check if the section's top is at or above the activation point
                    // AND its bottom is below the activation point (meaning it's covering the activation point)
                    if (rect.top <= activationPoint && rect.bottom > activationPoint) {
                        foundActiveSection = id;
                        break; // Found the active section, break the loop
                    }
                }
            }
            setActiveSection(foundActiveSection);


            setScrolled(window.scrollY > 50)

            const homeSection = document.getElementById('home')
            if (homeSection) {
                const homeRect = homeSection.getBoundingClientRect()
                // Home section is considered visible if a significant portion is within the viewport
                setIsHeroVisible(homeRect.top < window.innerHeight * 0.3 && homeRect.bottom > window.innerHeight * 0.7);
            }
        }

        // Add a debounce to handleScroll to prevent excessive calls on rapid scrolling
        let scrollTimeout: NodeJS.Timeout;
        const debouncedHandleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 50); // Adjust debounce time as needed
        };

        window.addEventListener('scroll', debouncedHandleScroll)
        handleScroll() // Call once on mount
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
            clearTimeout(scrollTimeout); // Clear timeout on unmount
        }
    }, [])

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    return (
        <nav
            ref={navbarRef}
            className={cn(
                "w-full fixed top-0 z-50 transition-all duration-300 ease-in-out",
                "backdrop-filter backdrop-blur-xl",
                scrolled
                    ? "bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 shadow-xl"
                    : "bg-white/70 dark:bg-gray-950/70",
                // Ensure shadow appears if hero scrolls away, even if scrolled state hasn't triggered yet
                (!isHeroVisible && !scrolled) && "border-b border-gray-200 dark:border-gray-800 shadow-xl"
            )}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <a
                    href="#home"
                    onClick={closeMenu}
                    className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text
                                 hover:scale-105 transition-transform duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                                 relative group"
                >
                    Soubhik Roy
                    <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </a>

                <div className="hidden md:flex gap-8 text-sm font-semibold">
                    {navItems.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            // Close menu on click for mobile, but it's hidden on desktop so it won't matter
                            // Also ensure activeSection is set immediately on click for better UX
                            onClick={() => {
                                closeMenu();
                                setActiveSection(item.href.replace('#', '')); // Set active immediately on click
                            }}
                            className={cn(
                                'relative transition-all duration-300 ease-in-out group',
                                activeSection === item.href.replace('#', '')
                                    ? 'text-primary'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100',
                            )}
                        >
                            {item.label}
                            <span
                                className={cn(
                                    'absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 transition-transform duration-300 ease-out origin-left',
                                    activeSection === item.href.replace('#', '') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                                )}
                            />
                        </a>
                    ))}
                </div>

                <button
                    className="md:hidden text-gray-800 dark:text-gray-100 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div className={cn(
                "md:hidden px-6 pb-6 space-y-3 shadow-md transition-all duration-300 ease-in-out overflow-hidden",
                "bg-white/95 dark:bg-gray-950/95",
                isOpen ? "max-h-screen opacity-100 pt-3" : "max-h-0 opacity-0"
            )}>
                {navItems.map(item => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                            closeMenu();
                            setActiveSection(item.href.replace('#', '')); // Set active immediately on click
                        }}
                        className={cn(
                            'block text-base font-medium px-4 py-2 rounded-md transition-colors duration-200',
                            activeSection === item.href.replace('#', '')
                                ? 'text-white bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 font-semibold shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                        )}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    )
}