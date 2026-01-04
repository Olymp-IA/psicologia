'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OlympiaLogo.module.css';

// Símbolos que rotan en el logo
const SYMBOLS = ['Ω', 'Ξ', '∞', '◊', '✧', '⟡', '◈', '⬡'];

interface OlympiaLogoProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function OlympiaLogo({ size = 'small', className = '' }: OlympiaLogoProps) {
    const [symbolIndex, setSymbolIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSymbolIndex((prev) => (prev + 1) % SYMBOLS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <a
            href="https://olymp-ia.cl"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.logo} ${styles[size]} ${className}`}
        >
            <span className={styles.text}>powered by</span>
            <span className={styles.brand}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={symbolIndex}
                        className={styles.symbol}
                        initial={{ opacity: 0, y: -10, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: 10, rotateX: 90 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        {SYMBOLS[symbolIndex]}
                    </motion.span>
                </AnimatePresence>
                <span className={styles.name}>OLYMP</span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={symbolIndex + '-xi'}
                        className={styles.symbolXi}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        Ξ
                    </motion.span>
                </AnimatePresence>
                <span className={styles.name}>IA</span>
                <span className={styles.domain}>.cl</span>
            </span>
        </a>
    );
}
