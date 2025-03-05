import React, { useState } from 'react';

const Reset: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        // Simular envío del código (sin API)
        setTimeout(() => {
            setIsLoading(false);
            setIsCodeSent(true); // Mostrar mensaje de éxito
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Número de Teléfono
                        </label>
                        <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ingresa tu Número de Teléfono"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Enviando Código...' : 'Enviar Código de Recuperación'}
                    </button>
                </form>
                {isCodeSent && (
                    <p className="mt-4 text-sm text-center text-green-600">
                        Código de recuperación enviado con éxito.
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

export default Reset;