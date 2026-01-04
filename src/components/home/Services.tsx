'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

const services = [
    {
        icon: '🧘',
        title: 'Terapia Individual',
        description: 'Sesiones personalizadas para trabajar en tus metas personales, superar dificultades emocionales y desarrollar herramientas de afrontamiento.',
        features: ['Ansiedad y Estrés', 'Depresión', 'Autoestima', 'Desarrollo Personal'],
        href: '/services#individual',
    },
    {
        icon: '💑',
        title: 'Terapia de Pareja',
        description: 'Mejora la comunicación, resuelve conflictos y fortalece el vínculo emocional con tu pareja en un espacio seguro y neutral.',
        features: ['Comunicación', 'Conflictos', 'Crisis', 'Fortalecimiento'],
        href: '/services#couples',
    },
    {
        icon: '👨‍👩‍👧‍👦',
        title: 'Terapia Familiar',
        description: 'Trabaja en la dinámica familiar, mejora las relaciones entre miembros y crea un ambiente más armonioso en el hogar.',
        features: ['Dinámicas Familiares', 'Crianza', 'Adolescentes', 'Transiciones'],
        href: '/services#family',
    },
    {
        icon: '💻',
        title: 'Consultas Online',
        description: 'Sesiones virtuales con la misma calidad y confidencialidad, desde la comodidad de tu hogar o cualquier lugar.',
        features: ['Videollamada Segura', 'Horarios Flexibles', 'Sin Desplazamiento', 'Internacional'],
        href: '/services#online',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Services() {
    return (
        <section className={styles.services}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.badge}>Nuestros Servicios</span>
                    <h2 className={styles.title}>
                        Encuentra el apoyo que <span className="gradient-text">necesitas</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Ofrecemos diferentes modalidades de terapia adaptadas a tus necesidades
                        específicas y circunstancias personales.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            className={styles.card}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <div className={styles.cardIcon}>{service.icon}</div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.description}</p>
                            <ul className={styles.cardFeatures}>
                                {service.features.map((feature) => (
                                    <li key={feature}>
                                        <span className={styles.featureCheck}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href={service.href} className={styles.cardLink}>
                                Saber más →
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p>¿No estás seguro/a de qué tipo de terapia necesitas?</p>
                    <Link href="/contact" className="btn btn-outline">
                        Contáctanos para una orientación
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
