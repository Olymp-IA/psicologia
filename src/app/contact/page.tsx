'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simular envío (conectar con backend real)
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <span className={styles.badge}>Contacto</span>
                        <h1 className={styles.title}>
                            ¿Tienes alguna <span className="gradient-text">pregunta</span>?
                        </h1>
                        <p className={styles.subtitle}>
                            Estamos aquí para ayudarte. Envíanos un mensaje o contáctanos
                            directamente a través de nuestros canales de comunicación.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contact}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <motion.div
                            className={styles.contactInfo}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Información de Contacto</h2>
                            <p>Puedes visitarnos, llamarnos o enviarnos un mensaje. Responderemos lo antes posible.</p>

                            <div className={styles.infoCards}>
                                <div className={styles.infoCard}>
                                    <span className={styles.infoIcon}>📍</span>
                                    <div>
                                        <h4>Dirección</h4>
                                        <p>Calle Principal #123<br />Tu Ciudad, País</p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <span className={styles.infoIcon}>📞</span>
                                    <div>
                                        <h4>Teléfono</h4>
                                        <p><a href="tel:+123456789">+123 456 789</a></p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <span className={styles.infoIcon}>✉️</span>
                                    <div>
                                        <h4>Email</h4>
                                        <p><a href="mailto:info@psicologia.com">info@psicologia.com</a></p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <span className={styles.infoIcon}>🕐</span>
                                    <div>
                                        <h4>Horario</h4>
                                        <p>Lunes - Viernes: 9:00 - 20:00<br />Sábados: 9:00 - 14:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.social}>
                                <h4>Síguenos</h4>
                                <div className={styles.socialLinks}>
                                    <a href="#" className={styles.socialLink}>📸 Instagram</a>
                                    <a href="#" className={styles.socialLink}>👤 Facebook</a>
                                    <a href="#" className={styles.socialLink}>💬 WhatsApp</a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className={styles.formWrapper}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <h3>Envíanos un Mensaje</h3>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Nombre completo *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Teléfono</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+123 456 789"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject">Asunto *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecciona un asunto</option>
                                            <option value="consulta">Consulta general</option>
                                            <option value="cita">Información sobre citas</option>
                                            <option value="tarifas">Consulta de tarifas</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Mensaje *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="¿En qué podemos ayudarte?"
                                        rows={5}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary btn-large ${styles.submitBtn}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        className={styles.successMessage}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        ✅ ¡Mensaje enviado! Te responderemos pronto.
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        className={styles.errorMessage}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        ❌ Hubo un error. Por favor, intenta nuevamente.
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className={styles.map}>
                <div className={styles.mapPlaceholder}>
                    <span>🗺️</span>
                    <p>Mapa de ubicación</p>
                    <small>Integrar Google Maps aquí</small>
                </div>
            </section>
        </div>
    );
}
