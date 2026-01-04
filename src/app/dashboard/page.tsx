'use client';

import { useEffect, useState } from 'react';
import { appointments } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
    const [citas, setCitas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }

        const userStr = localStorage.getItem('user');
        if (userStr) setUser(JSON.parse(userStr));

        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const res = await appointments.getMyAppointments();
            if (res.data) {
                setCitas(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl w-full py-8 text-black">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-primary-dark">Mi Panel</h1>
                    {user && <p className="text-gray-600">Bienvenido, {user.name}</p>}
                </div>
                <Link href="/appointments" className="btn btn-primary">
                    Nueva Cita
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-medium mb-6 text-gray-800">Mis Citas</h2>

                {loading ? (
                    <p className="text-gray-500">Cargando...</p>
                ) : citas.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No tienes citas agendadas.</p>
                        <Link href="/appointments" className="text-primary hover:underline">
                            Agendar mi primera cita
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {citas.map((cita) => (
                            <div key={cita.id} className="border border-gray-200 rounded-lg p-4 hover:border-accent transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-lg text-primary-dark">
                                                {new Date(cita.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${cita.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                    cita.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {cita.status === 'PENDING' ? 'Pendiente' :
                                                    cita.status === 'CONFIRMED' ? 'Confirmada' : cita.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">
                                            {new Date(cita.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} hrs
                                            {' - '}
                                            {cita.service?.name}
                                        </p>
                                    </div>

                                    {cita.meetLink && (
                                        <a
                                            href={cita.meetLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
                                        >
                                            <span>📹</span>
                                            Unirse a Meet
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
