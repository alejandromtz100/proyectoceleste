import React, { useState } from 'react';

const Pagos: React.FC = () => {
  const [formData, setFormData] = useState({
    payer: '',
    amount: '',
    paymentDate: '',
    profile: 'Departamento',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment data submitted:', formData);
    setFormData({ payer: '', amount: '', paymentDate: '', profile: 'Departamento' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro de Pagos</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="payer" className="block text-sm font-medium mb-2">Pagador</label>
            <input
              id="payer"
              name="payer"
              type="text"
              value={formData.payer}
              onChange={handleChange}
              placeholder="Nombre del pagador"
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
            <label htmlFor="paymentDate" className="block text-sm font-medium mb-2">Fecha de Pago</label>
            <input
              id="paymentDate"
              name="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={handleChange}
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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Registrar Pago
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagos;
