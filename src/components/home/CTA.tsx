'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CTA.module.css';

export default function CTA() {
    return (
        <section className={styles.cta}>
            <div className={styles.background}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>
                        Da el primer paso hacia tu bienestar
                    </h2>
                    <p className={styles.subtitle}>
                        No tienes que enfrentar tus desafíos solo/a. Estamos aquí para
                        acompañarte en cada paso de tu proceso de crecimiento personal.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>📅</span>
                            <span>Primera consulta gratuita</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>🔒</span>
                            <span>100% confidencial</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>⏰</span>
                            <span>Horarios flexibles</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/appointments" className="btn btn-primary btn-large">
                            Reservar Cita Ahora
                        </Link>
                        <a href="tel:+123456789" className={styles.phone}>
                            <span className={styles.phoneIcon}>📞</span>
                            <span className={styles.phoneText}>
                                <span className={styles.phoneLabel}>O llámanos</span>
                                <span className={styles.phoneNumber}>+123 456 789</span>
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
