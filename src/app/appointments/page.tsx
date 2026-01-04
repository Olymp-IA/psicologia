'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { appointments, auth } from '@/lib/api';
import { formatRut } from '@/utils/rut';
import Link from 'next/link';

const services = [
    { id: '1', name: 'Terapia Individual', duration: 60, price: 50000 },
    { id: '2', name: 'Terapia de Pareja', duration: 90, price: 70000 },
    { id: '3', name: 'Terapia Familiar', duration: 90, price: 80000 },
    { id: '4', name: 'Consulta Online', duration: 60, price: 45000 },
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
        rut: '',
        email: '',
        phone: '',
        notes: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar sesión y cargar datos de usuario
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                setFormData(prev => ({
                    ...prev,
                    name: user.name || '',
                    email: user.email || '',
                    rut: user.rut || '',
                    phone: user.phone || ''
                }));
            }
        }
    }, []);

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
        if (name === 'rut') {
            setFormData(prev => ({ ...prev, [name]: formatRut(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Si estamos en paso 3, ir a paso 4 (Pago)
        if (step === 3) {
            setStep(4);
            return;
        }

        // Si estamos en paso 4, enviar
        if (!file) {
            alert('Por favor adjunta el comprobante del bono');
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('serviceId', formData.serviceId);
            // Combinar fecha y hora
            const dateTime = new Date(`${formData.date}T${formData.time}:00`);
            data.append('date', dateTime.toISOString());

            data.append('patientName', formData.name);
            data.append('patientEmail', formData.email);
            data.append('rut', formData.rut);
            data.append('patientPhone', formData.phone);
            data.append('notes', formData.notes);
            data.append('bono', file);

            const res = await appointments.create(data);

            if (res.error) {
                alert(res.error);
            } else {
                setIsComplete(true);
            }
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al reservar');
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
                        <p>Hemos recibido tu solicitud y bono. La confirmación y enlace de Meet llegarán a <strong>{formData.email}</strong>.</p>
                        <div className={styles.appointmentSummary}>
                            <div className={styles.summaryItem}>
                                <span>📅</span>
                                <span>{new Date(`${formData.date}T12:00:00`).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
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

                        <Link href="/" className="btn btn-primary mt-4 inline-block">
                            Volver al Inicio
                        </Link>
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
                            Elige el servicio, selecciona horario, y adjunta tu bono Fonasa/Isapre.
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
                            <span>Horario</span>
                        </div>
                        <div className={styles.progressLine}></div>
                        <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
                            <div className={styles.progressNumber}>3</div>
                            <span>Datos</span>
                        </div>
                        <div className={styles.progressLine}></div>
                        <div className={`${styles.progressStep} ${step >= 4 ? styles.active : ''}`}>
                            <div className={styles.progressNumber}>4</div>
                            <span>Pago</span>
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
                                        <p className="text-primary font-bold">${service.price.toLocaleString('es-CL')}</p>
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

                            {!isLoggedIn && (
                                <div className="mb-6 p-4 bg-yellow-50 rounded-md border border-yellow-200">
                                    <p className="text-sm text-yellow-800 mb-2">
                                        ¿Ya tienes cuenta? Inicia sesión para autocompletar tus datos.
                                    </p>
                                    <Link href="/auth/login" className="text-primary font-bold hover:underline text-sm">
                                        Iniciar Sesión
                                    </Link>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="rut">RUT *</label>
                                        <input
                                            type="text"
                                            id="rut"
                                            name="rut"
                                            value={formData.rut}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="12.345.678-9"
                                        />
                                    </div>
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
                                </div>

                                <div className={styles.formRow}>
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
                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Teléfono *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+56 9 ..."
                                        />
                                    </div>
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
                                >
                                    Siguiente: Adjuntar Bono
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* Step 4: Payment & Upload */}
                    {step === 4 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={styles.stepContent}
                        >
                            <button className={styles.backBtn} onClick={() => setStep(3)}>
                                ← Volver
                            </button>

                            <h2>Pago y Bono</h2>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                                <h3 className="text-lg font-serif text-primary-dark mb-4">Información de Pago</h3>
                                <p className="text-gray-600 mb-2">Por favor realiza la compra del bono Fonasa o Isapre correspondiente a <strong className="text-primary">{selectedService?.name}</strong>.</p>
                                <p className="text-xl font-bold mb-4">${selectedService?.price.toLocaleString('es-CL')}</p>

                                <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                                    <p><strong>Datos Transferencia (Opcional si paga directo):</strong></p>
                                    <p>Banco: Estado</p>
                                    <p>Cuenta: Vista/RUT 12345678</p>
                                    <p>Email: pagos@olympia.cl</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                                        Adjuntar Comprobante/Bono (PDF o Imagen) *
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors bg-gray-50">
                                        <input
                                            type="file"
                                            id="file"
                                            accept=".pdf,image/*"
                                            onChange={handleFileChange}
                                            required
                                            className="w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-primary-light file:text-primary
                                            hover:file:bg-primary-light/80"
                                        />
                                        <p className="mt-2 text-xs text-gray-500">Máximo 5MB</p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary btn-large ${styles.submitBtn}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
