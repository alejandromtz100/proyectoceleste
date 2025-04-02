// src/pages/Reset.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.png';
import '../css/Login.css';

const Reset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Por favor ingrese su correo electrónico');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/users/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al solicitar recuperación');
      }

      setSuccess('Se ha enviado un correo con instrucciones para restablecer tu contraseña');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className={`w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-md ${isLoading ? 'opacity-50' : ''}`}>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Recuperar Contraseña</h2>
        {error && (
          <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 mt-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>
        </form>
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