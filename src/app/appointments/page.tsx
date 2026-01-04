'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const services = [
    { id: '1', name: 'Terapia Individual', duration: 60 },
    { id: '2', name: 'Terapia de Pareja', duration: 90 },
    { id: '3', name: 'Terapia Familiar', duration: 90 },
    { id: '4', name: 'Consulta Online', duration: 60 },
];

const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '16:00', '17:00', '18:00', '19:00',
];

export default function AppointmentsPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceId: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleServiceSelect = (serviceId: string) => {
        setFormData(prev => ({ ...prev, serviceId }));
        setStep(2);
    };

    const handleDateSelect = (date: string) => {
        setFormData(prev => ({ ...prev, date }));
    };

    const handleTimeSelect = (time: string) => {
        setFormData(prev => ({ ...prev, time }));
        setStep(3);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsComplete(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedService = services.find(s => s.id === formData.serviceId);

    // Generar próximos 14 días
    const getNextDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            if (date.getDay() !== 0) { // Excluir domingos
                days.push(date);
            }
        }
        return days;
    };

    if (isComplete) {
        return (
            <div className={styles.page}>
                <section className={styles.success}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.successCard}
                    >
                        <span className={styles.successIcon}>✅</span>
                        <h1>¡Cita Reservada!</h1>
                        <p>Hemos recibido tu solicitud de cita. Te enviaremos un email de confirmación a <strong>{formData.email}</strong>.</p>

                        <div className={styles.appointmentSummary}>
                            <div className={styles.summaryItem}>
                                <span>📅</span>
                                <span>{new Date(formData.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>⏰</span>
                                <span>{formData.time}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>🩺</span>
                                <span>{selectedService?.name}</span>
                            </div>
                        </div>

                        <a href="/" className="btn btn-primary">
                            Volver al Inicio
                        </a>
                    </motion.div>
                </section>
            </div>
        );
    }

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
                        <span className={styles.badge}>Reservar Cita</span>
                        <h1 className={styles.title}>
                            Agenda tu <span className="gradient-text">consulta</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Reserva tu cita en 3 sencillos pasos. Elige el servicio,
                            selecciona fecha y hora, y completa tus datos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Progress */}
            <section className={styles.progressSection}>
                <div className={styles.container}>
                    <div className={styles.progress}>
                        <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
                            <div className={styles.progressNumber}>1</div>
                            <span>Servicio</span>
                        </div>
                        <div className={styles.progressLine}></div>
                        <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
                            <div className={styles.progressNumber}>2</div>
                            <span>Fecha y Hora</span>
                        </div>
                        <div className={styles.progressLine}></div>
                        <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
                            <div className={styles.progressNumber}>3</div>
                            <span>Tus Datos</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Steps */}
            <section className={styles.booking}>
                <div className={styles.container}>
                    {/* Step 1: Service Selection */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={styles.stepContent}
                        >
                            <h2>¿Qué tipo de consulta necesitas?</h2>
                            <div className={styles.serviceGrid}>
                                {services.map((service) => (
                                    <motion.button
                                        key={service.id}
                                        className={styles.serviceOption}
                                        onClick={() => handleServiceSelect(service.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <h3>{service.name}</h3>
                                        <p>{service.duration} minutos</p>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Date & Time Selection */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={styles.stepContent}
                        >
                            <button className={styles.backBtn} onClick={() => setStep(1)}>
                                ← Volver
                            </button>

                            <h2>Selecciona fecha y hora</h2>
                            <p className={styles.selectedService}>
                                <strong>Servicio:</strong> {selectedService?.name}
                            </p>

                            <div className={styles.dateTimeGrid}>
                                <div className={styles.dateSection}>
                                    <h4>Fecha</h4>
                                    <div className={styles.dateGrid}>
                                        {getNextDays().map((date) => (
                                            <button
                                                key={date.toISOString()}
                                                className={`${styles.dateOption} ${formData.date === date.toISOString().split('T')[0] ? styles.selected : ''}`}
                                                onClick={() => handleDateSelect(date.toISOString().split('T')[0])}
                                            >
                                                <span className={styles.dayName}>
                                                    {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                                                </span>
                                                <span className={styles.dayNumber}>{date.getDate()}</span>
                                                <span className={styles.monthName}>
                                                    {date.toLocaleDateString('es-ES', { month: 'short' })}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {formData.date && (
                                    <motion.div
                                        className={styles.timeSection}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h4>Hora</h4>
                                        <div className={styles.timeGrid}>
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    className={`${styles.timeOption} ${formData.time === time ? styles.selected : ''}`}
                                                    onClick={() => handleTimeSelect(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Personal Details */}
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={styles.stepContent}
                        >
                            <button className={styles.backBtn} onClick={() => setStep(2)}>
                                ← Volver
                            </button>

                            <h2>Completa tus datos</h2>

                            <div className={styles.appointmentPreview}>
                                <div className={styles.previewItem}>
                                    <span>🩺</span>
                                    <span>{selectedService?.name}</span>
                                </div>
                                <div className={styles.previewItem}>
                                    <span>📅</span>
                                    <span>{new Date(formData.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                </div>
                                <div className={styles.previewItem}>
                                    <span>⏰</span>
                                    <span>{formData.time}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Nombre completo *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Teléfono *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+123 456 789"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="notes">Notas adicionales (opcional)</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="¿Hay algo que quieras que sepamos antes de la cita?"
                                        rows={3}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary btn-large ${styles.submitBtn}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Reservando...' : 'Confirmar Reserva'}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
