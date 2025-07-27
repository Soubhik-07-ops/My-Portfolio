'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useContactForm } from '@/app/context/ContactFormContext'

const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#publications', label: 'Publications' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const { open } = useContactForm()
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string>('home')
    const [scrolled, setScrolled] = useState(false)
    const [isHeroVisible, setIsHeroVisible] = useState(true)
    const navbarRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const scrollToHomeOnLoad = () => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                setTimeout(() => {
                    homeSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        };
        scrollToHomeOnLoad();

        const sectionIds = navItems.map(item => item.href.replace('#', ''))
        let navbarHeight = navbarRef.current?.offsetHeight || 80;

        const handleScroll = () => {
            navbarHeight = navbarRef.current?.offsetHeight || 80;
            const activationPoint = window.innerHeight * 0.25;

            let foundActiveSection = 'home';

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                const section = document.getElementById(id);

                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= activationPoint && rect.bottom > activationPoint) {
                        foundActiveSection = id;
                        break;
                    }
                }
            }
            setActiveSection(foundActiveSection);

            setScrolled(window.scrollY > 50)

            const homeSection = document.getElementById('home')
            if (homeSection) {
                const homeRect = homeSection.getBoundingClientRect()
                setIsHeroVisible(homeRect.top < window.innerHeight * 0.3 && homeRect.bottom > window.innerHeight * 0.7);
            }
        }

        let scrollTimeout: NodeJS.Timeout;
        const debouncedHandleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 50);
        };

        window.addEventListener('scroll', debouncedHandleScroll)
        handleScroll()
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
            clearTimeout(scrollTimeout);
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

                <div className="hidden md:flex gap-8 text-sm font-semibold items-center">
                    {navItems.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                                closeMenu()
                                setActiveSection(item.href.replace('#', ''))
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
                    <button
                        onClick={() => {
                            open()
                            closeMenu()
                        }}
                        className="ml-4 px-4 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-white rounded-md font-semibold
                       hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        Let's Talk
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={() => {
                            open()
                            closeMenu()
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-white rounded-md text-sm font-semibold"
                    >
                        Talk
                    </button>
                    <button
                        className="text-gray-800 dark:text-gray-100 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90"
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
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
                            closeMenu()
                            setActiveSection(item.href.replace('#', ''))
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