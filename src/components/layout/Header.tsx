'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const pathname = usePathname();
    const avatarRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: 'Personajes', path: '/people' },
        { name: 'Películas', path: '/films' },
        { name: 'Naves', path: '/starships' },
        { name: 'Planetas', path: '/planets' },
        { name: 'Favoritos', path: '/favorites' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLogout = () => setShowLogout((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
                setShowLogout(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.header
            className="bg-black/80 backdrop-blur-md border-b border-yellow-600 shadow-md py-4 px-6 fixed top-0 left-0 w-full z-50"
            initial="initial"
            animate="animate"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/starwars/star_wars_logo.png"
                        alt="Star Wars"
                        width={90}
                        height={50}
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`transition-all duration-300 text-sm tracking-wide uppercase ${isActive
                                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                                    : 'text-gray-300 hover:text-yellow-300'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {!session ? (
                        <button
                            onClick={() => signIn('google')}
                            className="text-sm bg-yellow-400 text-black font-semibold py-1 px-3 rounded hover:bg-yellow-300 transition cursor-pointer"
                        >
                            Iniciar sesión
                        </button>
                    ) : (
                        <div ref={avatarRef} className="relative">
                            <button onClick={toggleLogout} className="cursor-pointer">
                                <Image
                                    src={session.user?.image || '/placeholder.jpg'}
                                    alt="User"
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-yellow-500"
                                />
                            </button>
                            <AnimatePresence>
                                {showLogout && (
                                    <motion.div
                                        className="absolute right-0 mt-2 bg-[#1a1a1a] border border-yellow-600 text-sm text-white rounded shadow-lg z-10 w-[160px]"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <button
                                            onClick={() => signOut()}
                                            className="block w-full text-left px-4 py-2 hover:bg-yellow-600 hover:text-black transition cursor-pointer"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <motion.button
                    className="md:hidden text-yellow-400 z-20"
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? (
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl shadow-xl border-t border-yellow-700 z-40"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`block py-2 px-3 text-sm font-semibold rounded transition ${pathname === item.path
                                        ? 'bg-yellow-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-yellow-700">
                                {!session ? (
                                    <button
                                        onClick={() => signIn('google')}
                                        className="w-full text-sm bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition cursor-pointer"
                                    >
                                        Iniciar sesión
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-3 mt-2">
                                        <Image
                                            src={session.user?.image || '/placeholder.jpg'}
                                            alt="User"
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-yellow-500"
                                        />
                                        <button
                                            onClick={() => signOut()}
                                            className="text-sm text-gray-400 hover:text-yellow-400 transition"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
