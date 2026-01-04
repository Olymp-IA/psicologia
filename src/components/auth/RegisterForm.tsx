'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { formatRut, validateRut } from '@/utils/rut';
import Link from 'next/link';

export default function RegisterForm() {
    const router = useRouter();
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!validateRut(rut)) {
            setError('Por favor ingrese un RUT válido');
            setLoading(false);
            return;
        }

        try {
            const res = await auth.register(rut, name, email, password, phone);
            if (res.error) {
                setError(res.error);
            } else {
                if (res.data?.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    router.push('/appointments');
                }
            }
        } catch (err) {
            setError('Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRut(formatRut(e.target.value));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700">RUT</label>
                <input
                    type="text"
                    required
                    value={rut}
                    onChange={handleRutChange}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="12.345.678-9"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="Juan Pérez"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="correo@ejemplo.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="+56 9 1234 5678"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white bg-primary rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>

            <div className="text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                    Inicia sesión aquí
                </Link>
            </div>
        </form>
    );
}
