import React, { useState } from 'react';

const Restablecer: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simular el proceso de restablecimiento de contraseña (sin API)
        setTimeout(() => {
            setIsLoading(false);
            setIsPasswordReset(true); // Mostrar mensaje de éxito
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Nueva Contraseña
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ingresa tu Nueva Contraseña"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirma tu Nueva Contraseña"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-center text-red-600 mb-4">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Restableciendo Contraseña...' : 'Restablecer Contraseña'}
                    </button>
                </form>
                {isPasswordReset && (
                    <p className="mt-4 text-sm text-center text-green-600">
                        Contraseña restablecida con éxito.
                    </p>
                )}
                <p className="mt-6 text-sm text-center text-gray-600">
                    ¿Recordaste tu contraseña?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Iniciar Sesión
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Restablecer;