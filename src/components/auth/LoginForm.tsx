'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { formatRut, validateRut } from '@/utils/rut';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Si parece RUT, validarlo
        if (/^\d/.test(identifier) && !validateRut(identifier)) {
            // Opcional: mostrar advertencia o permitir igual por si es email con números
            // Pero mejor asumimos que si empieza con número es RUT
            // setError('RUT inválido');
            // setLoading(false);
            // return;
        }

        try {
            const res = await auth.login(identifier, password);
            if (res.error) {
                setError(res.error);
            } else {
                // Guardar token y redirigir
                if (res.data?.token) {
                    localStorage.setItem('token', res.data.token);
                    // Guardar info usuario también si se quiere
                    localStorage.setItem('user', JSON.stringify(res.data.user));

                    // Redirigir según rol (o al perfil)
                    router.push('/appointments');
                }
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Si el usuario empieza a escribir algo que parece RUT (dígito), formateamos
        // Si no (letra), asumimos email y no formateamos
        if (/^[\d\.-]+[kK]?$/.test(val) || val === '') {
            setIdentifier(formatRut(val));
        } else {
            setIdentifier(val);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700">RUT o Email</label>
                <input
                    type="text"
                    required
                    value={identifier}
                    onChange={handleRutChange}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="12.345.678-9 o correo@ejemplo.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                    type="password"
                    required
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
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>

            <div className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link href="/auth/register" className="text-primary hover:underline">
                    Regístrate aquí
                </Link>
            </div>
        </form>
    );
}
