// src/pages/Restablecer.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fondo from '../assets/fondo.png';
import '../css/Login.css';

const Restablecer: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token es válido al cargar la página
    const verifyToken = async () => {
      try {
        const response = await fetch(`https://apireact-1-88m9.onrender.com/api/users/verify-reset-token/${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Token inválido o expirado');
        }

        setIsTokenValid(true);
      } catch (err: any) {
        setError(err.message);
        setIsTokenValid(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError('No se proporcionó token de recuperación');
      setIsTokenValid(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña');
      }

      setSuccess('Contraseña restablecida con éxito. Redirigiendo...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
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
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Token Inválido</h2>
          {error && (
            <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          <p className="mt-6 text-sm text-center text-gray-600">
            El enlace de recuperación no es válido o ha expirado. Por favor solicita un nuevo enlace.
          </p>
          <button
            onClick={() => navigate('/reset')}
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Solicitar Nuevo Enlace
          </button>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-semibold text-center text-gray-700">Restablecer Contraseña</h2>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nueva contraseña"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirma tu nueva contraseña"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Restablecer;