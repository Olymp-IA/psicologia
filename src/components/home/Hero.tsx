'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.pattern}></div>
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className={styles.badge}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        ✨ Cuidamos tu bienestar mental
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Tu camino hacia el{' '}
                        <span className={styles.highlight}>equilibrio emocional</span>{' '}
                        comienza aquí
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Ofrecemos un espacio seguro y confidencial donde explorar tus
                        emociones, superar desafíos y desarrollar herramientas para
                        una vida más plena y satisfactoria.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/appointments" className="btn btn-primary btn-large">
                            Agenda tu Primera Cita
                        </Link>
                        <Link href="/services" className="btn btn-secondary btn-large">
                            Conoce Nuestros Servicios
                        </Link>
                    </motion.div>

                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Años de Experiencia</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>500+</span>
                            <span className={styles.statLabel}>Pacientes Atendidos</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>98%</span>
                            <span className={styles.statLabel}>Satisfacción</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className={styles.imageContainer}>
                        <div className={styles.imagePlaceholder}>
                            <span className={styles.placeholderIcon}>🧠</span>
                            <span className={styles.placeholderText}>Bienestar Mental</span>
                        </div>
                        <div className={styles.floatingCard1}>
                            <span>💚</span>
                            <span>Terapia Personalizada</span>
                        </div>
                        <div className={styles.floatingCard2}>
                            <span>🌿</span>
                            <span>Ambiente Acogedor</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className={styles.scrollIndicator}>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <span>↓</span>
                </motion.div>
            </div>
        </section>
    );
}
