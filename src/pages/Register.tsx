import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.png';
import '../css/Login.css'; // Se reutiliza el CSS del Login para las animaciones

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [tower, setTower] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNumber || !department || !tower || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber, department, tower, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Hubo un error al registrar el usuario');
      }
      
      // Simular tiempos para la animación y redirección
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }, 2000);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
    >
      <div className={`w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-md ${isLoading || isSuccess ? 'opacity-50' : ''}`}>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Registro</h2>
        {error && <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
            <input
              id="phone"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu número de teléfono"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Departamento</label>
            <input
              id="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu departamento"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tower" className="block text-sm font-medium text-gray-700">Torre</label>
            <input
              id="tower"
              type="text"
              value={tower}
              onChange={(e) => setTower(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu torre"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Crea tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
        </form>
      </div>
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
              <p className="success-message active">Registro exitoso</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
