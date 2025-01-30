import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.png';
import '../css/Login.css'; // Archivo CSS para las animaciones

interface LoginProps {
  onLogin: (phone: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!phone || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar el rol y el id en el localStorage
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userId', data.user._id);

      console.log('Inicio de sesión exitoso:', data);

      // Simular un tiempo de espera para la animación
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true); // Mostrar mensaje de éxito
        setTimeout(() => {
          if (data.user.role === 'user') {
            navigate('/Dashboard');
          } else if (data.user.role === 'admin') {
            navigate('/inicioadmin');
          }
        }, 2000); // Redirigir después de 2 segundos
      }, 2000); // Simular un tiempo de carga de 2 segundos
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
      console.error('Error al iniciar sesión:', err.message);
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
      <div className={`w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-md ${isLoading || isSuccess ? 'opacity-50' : ''}`}>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Inicio de Sesión</h2>
        {error && (
          <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
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
              placeholder="Ingresa tu Número"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu Contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>

      {/* Animación de carga */}
{(isLoading || isSuccess) && (
  <div className="loading-animation active">
    {isLoading && (
      <>
        <div className="spinner"></div>
        <p className="loading-text">Cargando...</p>
      </>
    )}
    {isSuccess && (
      <>
        <div className="checkmark"></div>
        <p className="success-message active">Inicio de sesión exitoso</p>
      </>
    )}
  </div>
)}
    </div>
  );
};

export default Login;