import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/items', label: 'Tax & Duty' },
        { path: '/uom', label: 'UOM Manager' },
        { path: '/uom-table', label: 'UOM Table' },
        { path: '/tax-table', label: 'Tax Info' },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <header className="bg-[#061525] border-4 broder-red-400 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <Link to="/" className="flex items-center space-x-3">
                            <motion.svg
                                whileHover={{ rotate: 10 }}
                                className="h-8 w-8 text-blue-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </motion.svg>
                            <span className="font-bold text-xl">TaxDuty</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative group px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {location.pathname === item.path && (
                                        <motion.span
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-white/10 rounded-md z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>

                                    {/* Hover indicator */}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {isOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, height: "auto" },
                    closed: { opacity: 0, height: 0 }
                }}
                className="md:hidden overflow-hidden bg-[#0c2542]"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path
                                    ? "bg-blue-800 text-white"
                                    : "text-gray-200 hover:bg-blue-700 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default Header;
