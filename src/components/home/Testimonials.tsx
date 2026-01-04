'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'María García',
        role: 'Terapia Individual',
        content: 'Después de meses sintiéndome perdida, encontré en esta consulta el apoyo que necesitaba. El proceso terapéutico me ayudó a reconectar conmigo misma y a desarrollar herramientas que uso a diario.',
        rating: 5,
        avatar: '👩',
    },
    {
        id: 2,
        name: 'Carlos y Ana',
        role: 'Terapia de Pareja',
        content: 'Nuestra relación atravesaba una crisis profunda. Gracias a las sesiones, aprendimos a comunicarnos de manera efectiva y a entender las necesidades del otro. Hoy estamos más unidos que nunca.',
        rating: 5,
        avatar: '👫',
    },
    {
        id: 3,
        name: 'Laura Fernández',
        role: 'Consultas Online',
        content: 'La flexibilidad de las consultas online me permitió continuar mi terapia incluso con mi agenda complicada. La calidad de atención es la misma que en presencial. ¡100% recomendado!',
        rating: 5,
        avatar: '👩‍💼',
    },
    {
        id: 4,
        name: 'Roberto Méndez',
        role: 'Terapia Individual',
        content: 'Llegué con ansiedad severa que afectaba mi vida laboral. El enfoque profesional y empático me ayudó a superar mis miedos y hoy vivo con mucha más tranquilidad y confianza.',
        rating: 5,
        avatar: '👨',
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className={styles.badge}>Testimonios</span>
                    <h2 className={styles.title}>
                        Lo que dicen <span className="gradient-text">nuestros pacientes</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Historias reales de personas que han transformado su bienestar emocional.
                    </p>
                </motion.div>

                <div className={styles.carouselWrapper}>
                    <button
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={prevTestimonial}
                        aria-label="Anterior"
                    >
                        ←
                    </button>

                    <div className={styles.carousel}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className={styles.testimonialCard}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={styles.rating}>
                                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                        <span key={i} className={styles.star}>⭐</span>
                                    ))}
                                </div>
                                <blockquote className={styles.quote}>
                                    "{testimonials[activeIndex].content}"
                                </blockquote>
                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        {testimonials[activeIndex].avatar}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <h4 className={styles.authorName}>
                                            {testimonials[activeIndex].name}
                                        </h4>
                                        <p className={styles.authorRole}>
                                            {testimonials[activeIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={nextTestimonial}
                        aria-label="Siguiente"
                    >
                        →
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Ir a testimonio ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
