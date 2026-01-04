'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const values = [
    {
        icon: '🤝',
        title: 'Confidencialidad',
        description: 'Tu privacidad es nuestra prioridad. Todo lo compartido queda en un espacio seguro.',
    },
    {
        icon: '💚',
        title: 'Empatía',
        description: 'Te escuchamos sin juzgar, acompañándote con comprensión en cada paso de tu proceso.',
    },
    {
        icon: '🎯',
        title: 'Profesionalismo',
        description: 'Formación continua y métodos basados en evidencia científica para tu bienestar.',
    },
    {
        icon: '🌱',
        title: 'Crecimiento',
        description: 'Impulsamos tu desarrollo personal para que alcances tu máximo potencial.',
    },
];

export default function About() {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.div
                        className={styles.textSection}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={styles.badge}>Sobre Nosotros</span>
                        <h2 className={styles.title}>
                            Más de 10 años cuidando tu{' '}
                            <span className="gradient-text">salud mental</span>
                        </h2>
                        <p className={styles.description}>
                            Somos un equipo de profesionales apasionados por la salud mental,
                            comprometidos con brindarte atención de calidad en un ambiente
                            cálido y acogedor.
                        </p>
                        <p className={styles.description}>
                            Creemos en un enfoque integral que combina las mejores prácticas
                            terapéuticas con un trato humano y cercano. Cada persona es única,
                            y así abordamos cada proceso terapéutico.
                        </p>

                        <div className={styles.highlight}>
                            <div className={styles.highlightIcon}>🎓</div>
                            <div className={styles.highlightContent}>
                                <h4>Formación Especializada</h4>
                                <p>Psicólogos colegiados con especializaciones en terapia cognitivo-conductual,
                                    terapia sistémica y psicología clínica.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.valuesGrid}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                className={styles.valueCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <span className={styles.valueIcon}>{value.icon}</span>
                                <h4 className={styles.valueTitle}>{value.title}</h4>
                                <p className={styles.valueDescription}>{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
