'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const services = [
    {
        id: 'individual',
        icon: '🧘',
        title: 'Terapia Individual',
        subtitle: 'Acompañamiento personalizado para tu bienestar',
        description: 'Sesiones individuales diseñadas para trabajar en tus objetivos personales, superar dificultades emocionales y desarrollar estrategias de afrontamiento efectivas.',
        benefits: [
            'Tratamiento de ansiedad y estrés',
            'Superación de la depresión',
            'Mejora de la autoestima',
            'Gestión emocional',
            'Desarrollo personal',
            'Duelo y pérdidas',
        ],
        duration: '50-60 minutos',
        modality: 'Presencial u Online',
    },
    {
        id: 'couples',
        icon: '💑',
        title: 'Terapia de Pareja',
        subtitle: 'Fortalece tu relación con herramientas efectivas',
        description: 'Un espacio neutral donde ambos miembros de la pareja pueden expresarse, resolver conflictos y trabajar juntos hacia una relación más sana y satisfactoria.',
        benefits: [
            'Mejora de la comunicación',
            'Resolución de conflictos',
            'Recuperación de la intimidad',
            'Manejo de crisis',
            'Infidelidad y perdón',
            'Preparación prematrimonial',
        ],
        duration: '75-90 minutos',
        modality: 'Presencial u Online',
    },
    {
        id: 'family',
        icon: '👨‍👩‍👧‍👦',
        title: 'Terapia Familiar',
        subtitle: 'Armonía y bienestar para toda la familia',
        description: 'Intervención terapéutica que involucra a los miembros de la familia para mejorar las dinámicas relacionales y resolver conflictos de manera constructiva.',
        benefits: [
            'Mejora de las dinámicas familiares',
            'Comunicación efectiva',
            'Manejo de adolescentes',
            'Crianza positiva',
            'Transiciones familiares',
            'Conflictos intergeneracionales',
        ],
        duration: '75-90 minutos',
        modality: 'Presencial',
    },
    {
        id: 'online',
        icon: '💻',
        title: 'Consultas Online',
        subtitle: 'Terapia de calidad desde donde estés',
        description: 'Sesiones virtuales a través de plataformas seguras que garantizan la misma calidad, confidencialidad y efectividad que las consultas presenciales.',
        benefits: [
            'Comodidad desde tu hogar',
            'Horarios flexibles',
            'Sin desplazamientos',
            'Atención internacional',
            'Plataforma segura',
            'Misma calidad terapéutica',
        ],
        duration: '50-60 minutos',
        modality: '100% Online',
    },
];

const faqs = [
    {
        question: '¿Cuánto dura una sesión de terapia?',
        answer: 'Las sesiones individuales duran entre 50-60 minutos. Las sesiones de pareja y familia suelen extenderse a 75-90 minutos.',
    },
    {
        question: '¿Con qué frecuencia debo asistir?',
        answer: 'Generalmente recomendamos sesiones semanales al inicio del tratamiento. A medida que avanzas, podemos espaciarlas según tu progreso.',
    },
    {
        question: '¿Cuántas sesiones necesitaré?',
        answer: 'Depende de tus objetivos y situación particular. Algunos procesos pueden durar 10-15 sesiones, mientras que otros requieren un acompañamiento más prolongado.',
    },
    {
        question: '¿La terapia online es igual de efectiva?',
        answer: 'Sí. Múltiples estudios demuestran que la terapia online tiene la misma efectividad que la presencial para la mayoría de los casos.',
    },
];

export default function ServicesPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={styles.badge}>Nuestros Servicios</span>
                        <h1 className={styles.title}>
                            Encuentra el tipo de terapia <span className="gradient-text">ideal para ti</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Ofrecemos diferentes modalidades terapéuticas adaptadas a tus
                            necesidades específicas. Todos nuestros servicios están basados
                            en técnicas con respaldo científico.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className={styles.services}>
                <div className={styles.container}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            className={`${styles.serviceCard} ${index % 2 === 1 ? styles.reversed : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.serviceContent}>
                                <span className={styles.serviceIcon}>{service.icon}</span>
                                <h2 className={styles.serviceTitle}>{service.title}</h2>
                                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                                <p className={styles.serviceDescription}>{service.description}</p>

                                <div className={styles.serviceDetails}>
                                    <div className={styles.detailItem}>
                                        <span>⏱️</span>
                                        <span>{service.duration}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span>📍</span>
                                        <span>{service.modality}</span>
                                    </div>
                                </div>

                                <Link href="/appointments" className="btn btn-primary">
                                    Reservar Cita
                                </Link>
                            </div>

                            <div className={styles.serviceBenefits}>
                                <h4>¿Qué trabajamos?</h4>
                                <ul>
                                    {service.benefits.map((benefit) => (
                                        <li key={benefit}>
                                            <span className={styles.checkIcon}>✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Pricing Note */}
            <section className={styles.pricing}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.pricingCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>💰 Sobre Nuestras Tarifas</h3>
                        <p>
                            Cada persona tiene una situación única. Por eso, ofrecemos diferentes
                            opciones y facilidades de pago. Contáctanos para conocer nuestras
                            tarifas actualizadas y opciones disponibles.
                        </p>
                        <Link href="/contact" className="btn btn-outline">
                            Consultar Tarifas
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* FAQs */}
            <section className={styles.faqs}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Preguntas Frecuentes</h2>
                        <p>Resolvemos tus dudas más comunes sobre nuestros servicios.</p>
                    </div>

                    <div className={styles.faqGrid}>
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={styles.faqCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4>{faq.question}</h4>
                                <p>{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <h2>¿Listo para empezar?</h2>
                    <p>Da el primer paso hacia tu bienestar. Reserva tu primera consulta hoy.</p>
                    <Link href="/appointments" className="btn btn-primary btn-large">
                        Reservar Primera Consulta
                    </Link>
                </div>
            </section>
        </div>
    );
}
