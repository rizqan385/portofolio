    'use client'

    import { useState } from 'react'
    import { FaGlobe } from 'react-icons/fa'
    import { motion, AnimatePresence } from 'framer-motion'

    export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const navItems = [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ]

    const handleLinkClick = (e, href) => {
        e.preventDefault()
        const section = document.querySelector(href)
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        }
        setMenuOpen(false)
    }

    return (
        <nav className="bg-black/30 backdrop-blur-md text-white fixed w-full z-50 shadow-md font-orbitron">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 text-xl font-audiowide">
            Rizqan
            <img src="/textures/rocket.gif" alt="Rocket" className="w-10 h-10" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-10 text-sm md:text-base tracking-wide">
            {navItems.map(({ label, href }) => (
                <a
                key={label}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className="relative group transition-all duration-300 cursor-pointer"
                >
                <span
                    className={`group-hover:text-blue-400 ${
                    label === 'Home' ? 'font-audiowide' : ''
                    }`}
                >
                    {label}
                </span>
                <span className="block h-[2px] w-0 group-hover:w-full bg-blue-400 transition-all duration-300 mt-1"></span>
                </a>
            ))}
            </div>

            {/* Mobile Toggle */}
            <div className="flex md:hidden">
            <button
                className="text-white text-2xl hover:text-blue-400 transition"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <motion.div
                animate={{
                    rotate: menuOpen ? 360 : 0,
                    scale: menuOpen ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
                >
                <FaGlobe />
                </motion.div>
            </button>
            </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
            {menuOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-black/70 backdrop-blur-sm px-6 pt-2 pb-4"
            >
                <ul className="flex flex-col gap-4 text-white">
                {navItems.map(({ label, href }) => (
                    <li key={label}>
                    <a
                        href={href}
                        onClick={(e) => handleLinkClick(e, href)}
                        className={`block hover:text-blue-400 transition duration-300 ${
                        label === 'Home' ? 'font-audiowide' : ''
                        }`}
                    >
                        {label}
                    </a>
                    </li>
                ))}
                </ul>
            </motion.div>
            )}
        </AnimatePresence>
        </nav>
    )
    }
