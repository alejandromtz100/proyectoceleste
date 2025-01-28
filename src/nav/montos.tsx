import React, { useState } from 'react';
import Navbar from '../components/navbar'; 

const Montos: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    date: '',
    department: '',
    tower: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:4000/api/montos/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el monto.');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      setMessage('Monto registrado correctamente.');
      setFormData({
        name: '',
        description: '',
        amount: '',
        date: '',
        department: '',
        tower: '',
      });
    } catch (error) {
      console.error(error);
      setMessage('Ocurrió un error al enviar el formulario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro de Montos</h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Escribe una descripción"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">Monto</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Ingrese el monto"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">Fecha</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium mb-2">Departamento</label>
            <input
              id="department"
              name="department"
              type="text"
              value={formData.department}
              onChange={handleChange}
              placeholder="Ingrese el departamento"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="tower" className="block text-sm font-medium mb-2">Torre</label>
            <input
              id="tower"
              name="tower"
              type="text"
              value={formData.tower}
              onChange={handleChange}
              placeholder="Ingrese la torre"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-bold py-3 rounded-md transition duration-300`}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Montos;
