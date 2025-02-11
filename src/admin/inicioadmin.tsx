import React from 'react';
import Navbar from '../components/navbar'; // Importar el Navbar original
import { FaTools, FaMoneyCheckAlt, FaCalendarAlt, FaEye } from 'react-icons/fa'; // Importar íconos de React Icons
import { Bar } from 'react-chartjs-2'; // Importar gráficos de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Inicioadmin: React.FC = () => {
  // Datos de ejemplo para gestiones de administrador de condominios
  const gestiones = [
    {
      id: 1,
      tipo: 'Solicitud de reparación',
      descripcion: 'Fuga de agua en el baño en el departamento 302',
      fecha: '15/10/2023',
      icono: <FaTools className="text-4xl text-cyan-600" />,
    },
    {
      id: 2,
      tipo: 'Pago pendiente',
      descripcion: 'Cuota de mantenimiento del departamento 105',
      fecha: '10/10/2023',
      icono: <FaMoneyCheckAlt className="text-4xl text-cyan-600" />,
    },
    {
      id: 3,
      tipo: 'Reserva de área común',
      descripcion: 'Solicitud para usar el salón de eventos el 20/10/2023',
      fecha: '05/10/2023',
      icono: <FaCalendarAlt className="text-4xl text-cyan-600" />,
    },
  ];

  // Datos para el gráfico de pagos
  const dataPagos = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Pagos recibidos',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: 'rgba(0, 255, 255, 0.8)',
      },
      {
        label: 'Pagos pendientes',
        data: [2000, 3000, 4000, 1000, 2000, 5000],
        backgroundColor: 'rgba(0, 150, 150, 0.8)',
      },
    ],
  };

  // Datos para el gráfico de registro de usuarios
  const dataUsuarios = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Usuarios registrados',
        data: [10, 15, 7, 12, 20, 18],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resumen de pagos mensuales',
      },
    },
  };

  const optionsUsuarios = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Registro de usuarios mensuales',
      },
    },
  };

  return (
    <>
      {/* Navbar original */}
      <Navbar />

      {/* Contenido principal */}
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-teal-600 to-blue-800 p-8">
        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white font-sans">Bienvenido Administrador</h1>
          <p className="mt-4 text-xl text-gray-100 font-light">
            Estas son tus gestiones pendientes
          </p>
        </div>

        {/* Contenedor de gráficas */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Gráfico de pagos */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
            <Bar data={dataPagos} options={options} />
          </div>

          {/* Gráfico de registro de usuarios */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
            <Bar data={dataUsuarios} options={optionsUsuarios} />
          </div>
        </div>

        {/* Contenedor de gestiones */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {gestiones.map((gestion) => (
            <div
              key={gestion.id}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200/20"
            >
              <div className="p-6">
                {/* Ícono de la gestión */}
                <div className="flex justify-center mb-4">
                  {gestion.icono}
                </div>
                {/* Detalles de la gestión */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{gestion.tipo}</h2>
                <p className="text-gray-600 text-lg mb-4">{gestion.descripcion}</p>
                <p className="text-gray-500 text-sm mb-4">Fecha: {gestion.fecha}</p>
                <button className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  <FaEye className="mr-2" />
                  Revisar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inicioadmin;