'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Sobre Nosotros' },
    { href: '/services', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contacto' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🧠</span>
                    <div className={styles.logoText}>
                        <span className={styles.logoName}>Psicología</span>
                        <span className={styles.logoTagline}>Bienestar Mental</span>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <Link href="/appointments" className="btn btn-primary">
                        Reservar Cita
                    </Link>
                </div>

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className={styles.mobileNav}>
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={styles.mobileNavLink}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                            >
                                <Link
                                    href="/appointments"
                                    className="btn btn-primary"
                                    style={{ width: '100%', marginTop: '1rem' }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Reservar Cita
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
