'use client';

import React from 'react';
import * as FM from 'framer-motion';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { fadeIn } from '@/lib/animations';

const motion = FM.motion;

const Footer: React.FC = () => {
    return (
        <motion.footer
            className="bg-black/90 backdrop-blur-md border-t border-yellow-600 py-10 px-6"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Branding */}
                <div className="text-center md:text-left">
                    <div className="text-yellow-400 text-2xl font-extrabold tracking-widest">
                        STAR WARS API
                    </div>
                    <p className="text-gray-400 text-sm mt-2 max-w-xs">
                        Explora el universo de Star Wars desde tu navegador.
                    </p>
                </div>

                {/* Redes sociales */}
                <div className="flex items-center space-x-6 text-2xl">
                    <motion.a
                        href="#"
                        className="text-gray-500 hover:text-yellow-400 transition-colors"
                        whileHover={{ y: -4, scale: 1.1 }}
                        aria-label="Twitter"
                    >
                        <FaTwitter />
                    </motion.a>

                    <motion.a
                        href="#"
                        className="text-gray-500 hover:text-yellow-400 transition-colors"
                        whileHover={{ y: -4, scale: 1.1 }}
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </motion.a>

                    <motion.a
                        href="#"
                        className="text-gray-500 hover:text-yellow-400 transition-colors"
                        whileHover={{ y: -4, scale: 1.1 }}
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </motion.a>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm">
                <p className="text-gray-500">
                    © {new Date().getFullYear()} Star Wars API Explorer.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                    Basado en datos públicos de SWAPI · Hecho con Next.js
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;
