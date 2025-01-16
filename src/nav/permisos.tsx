import React, { useState } from 'react';

const Permisos: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    gateNumber: '',
    profile: 'Departamento',
    exitDate: '',
  });

  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Permission submitted:', { ...formData, entryDate: currentDate, entryTime: currentTime });
    setFormData({ name: '', gateNumber: '', profile: 'Departamento', exitDate: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Permisos de Portones</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del usuario"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="gateNumber" className="block text-sm font-medium mb-2">No. del Portón</label>
            <input
              id="gateNumber"
              name="gateNumber"
              type="text"
              value={formData.gateNumber}
              onChange={handleChange}
              placeholder="Número del portón"
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="profile" className="block text-sm font-medium mb-2">Lista de Perfiles</label>
            <select
              id="profile"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Departamento">Departamento</option>
              <option value="Administración">Administración</option>
              <option value="Torre">Torre</option>
              <option value="Dueño">Dueño</option>
              <option value="Administrador">Administrador</option>
              <option value="Inquilino">Inquilino</option>
            </select>
          </div>
          <div>
            <label htmlFor="entryDate" className="block text-sm font-medium mb-2">Fecha de Entrada</label>
            <input
              id="entryDate"
              name="entryDate"
              type="text"
              value={currentDate}
              readOnly
              className="w-full p-3 rounded-md bg-gray-700 text-gray-400 border border-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="exitDate" className="block text-sm font-medium mb-2">Fecha de Salida</label>
            <input
              id="exitDate"
              name="exitDate"
              type="date"
              value={formData.exitDate}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="entryTime" className="block text-sm font-medium mb-2">Hora de Entrada</label>
            <input
              id="entryTime"
              name="entryTime"
              type="text"
              value={currentTime}
              readOnly
              className="w-full p-3 rounded-md bg-gray-700 text-gray-400 border border-gray-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Guardar Permiso
          </button>
        </form>
      </div>
    </div>
  );
};

export default Permisos;
