import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.png';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [tower, setTower] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccessMessage(null); // Reset success state
    setLoading(true); // Set loading to true

    const userData = { name, phoneNumber, department, tower, password };

    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Usuario registrado exitosamente. Redirigiendo a la página de inicio de sesión...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a short delay
        }, 2000);
      } else {
        setError(data.message || 'Hubo un error al registrar el usuario');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false); // Set loading to false once the request finishes
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
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md bg-opacity-90">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Registro</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <input
              id="phone"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu número de telefono"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Departamento
            </label>
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
            <label htmlFor="tower" className="block text-sm font-medium text-gray-700">
              Torre
            </label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
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
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
