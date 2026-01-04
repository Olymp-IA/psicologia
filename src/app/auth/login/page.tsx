import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="max-w-md w-full">
            <h1 className="text-3xl font-serif text-primary-dark text-center mb-8">
                Bienvenido a <span className="font-bold">Olymp-IA</span>
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-medium text-center mb-6 text-gray-800">Iniciar Sesión</h2>
                <LoginForm />
            </div>
        </div>
    );
}
