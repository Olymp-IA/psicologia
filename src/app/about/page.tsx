'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const team = [
    {
        name: 'Dra. María González',
        role: 'Directora y Psicóloga Clínica',
        specialties: ['Terapia Cognitivo-Conductual', 'Ansiedad', 'Depresión'],
        description: 'Con más de 15 años de experiencia, especializada en trastornos de ansiedad y depresión. Formación en España y Latinoamérica.',
        avatar: '👩‍⚕️',
    },
    {
        name: 'Dr. Carlos Ruiz',
        role: 'Psicólogo de Pareja y Familia',
        specialties: ['Terapia Sistémica', 'Parejas', 'Familia'],
        description: 'Especialista en terapia de pareja y familia con enfoque sistémico. Mediador familiar certificado.',
        avatar: '👨‍⚕️',
    },
    {
        name: 'Lic. Ana Martínez',
        role: 'Psicóloga Infanto-Juvenil',
        specialties: ['Niños', 'Adolescentes', 'TDAH'],
        description: 'Experta en desarrollo infantil y adolescente. Especializada en dificultades de aprendizaje y conducta.',
        avatar: '👩‍🏫',
    },
];

const timeline = [
    { year: '2014', event: 'Apertura de la consulta' },
    { year: '2016', event: 'Incorporación de terapia de pareja' },
    { year: '2018', event: 'Expansión del equipo profesional' },
    { year: '2020', event: 'Lanzamiento de consultas online' },
    { year: '2023', event: 'Más de 500 pacientes atendidos' },
];

export default function AboutPage() {
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
                        <span className={styles.badge}>Sobre Nosotros</span>
                        <h1 className={styles.title}>
                            Conoce a nuestro <span className="gradient-text">equipo</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Profesionales comprometidos con tu bienestar mental y emocional,
                            brindando atención cálida y basada en evidencia científica.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        <motion.div
                            className={styles.missionCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className={styles.missionIcon}>🎯</span>
                            <h3>Nuestra Misión</h3>
                            <p>Proporcionar atención psicológica de excelencia, accesible y humanizada,
                                contribuyendo al bienestar mental de nuestra comunidad.</p>
                        </motion.div>
                        <motion.div
                            className={styles.missionCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className={styles.missionIcon}>👁️</span>
                            <h3>Nuestra Visión</h3>
                            <p>Ser referentes en salud mental, promoviendo una sociedad donde
                                cuidar el bienestar emocional sea una prioridad accesible para todos.</p>
                        </motion.div>
                        <motion.div
                            className={styles.missionCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className={styles.missionIcon}>💚</span>
                            <h3>Nuestros Valores</h3>
                            <p>Empatía, confidencialidad, profesionalismo y respeto por la
                                individualidad de cada persona que confía en nosotros.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className={styles.team}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Nuestro Equipo</h2>
                        <p>Profesionales con amplia formación y experiencia en salud mental.</p>
                    </div>

                    <div className={styles.teamGrid}>
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className={styles.teamCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className={styles.teamAvatar}>{member.avatar}</div>
                                <h3 className={styles.teamName}>{member.name}</h3>
                                <p className={styles.teamRole}>{member.role}</p>
                                <p className={styles.teamDescription}>{member.description}</p>
                                <div className={styles.teamSpecialties}>
                                    {member.specialties.map((specialty) => (
                                        <span key={specialty} className={styles.specialty}>
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className={styles.timeline}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Nuestra Historia</h2>
                        <p>Un camino de crecimiento y compromiso con la salud mental.</p>
                    </div>

                    <div className={styles.timelineWrapper}>
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                className={styles.timelineItem}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={styles.timelineYear}>{item.year}</div>
                                <div className={styles.timelineEvent}>{item.event}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className={styles.certifications}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Formación y Certificaciones</h2>
                        <p>Actualización continua para brindarte la mejor atención.</p>
                    </div>

                    <div className={styles.certGrid}>
                        <div className={styles.certCard}>
                            <span>🎓</span>
                            <p>Colegio Oficial de Psicólogos</p>
                        </div>
                        <div className={styles.certCard}>
                            <span>📜</span>
                            <p>Terapia Cognitivo-Conductual</p>
                        </div>
                        <div className={styles.certCard}>
                            <span>🏥</span>
                            <p>Psicología Clínica</p>
                        </div>
                        <div className={styles.certCard}>
                            <span>👨‍👩‍👧‍👦</span>
                            <p>Terapia Sistémica Familiar</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
