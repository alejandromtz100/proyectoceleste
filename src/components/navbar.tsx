import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegación
import { FaMoneyBillAlt, FaChartLine, FaKey, FaBuilding, FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleLogout = () => {
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer flex items-center space-x-2">
          <FaBuilding />
          <a href="/">CondoWeb</a>
        </div>

        {/* Links centrados */}
        <ul className="hidden md:flex space-x-12">
          <li className="flex items-center space-x-2">
            <FaMoneyBillAlt />
            <a href="/pagos" className="hover:text-gray-300 transition">
              Pagos
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <FaChartLine />
            <a href="/montos" className="hover:text-gray-300 transition">
              Monto
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <FaKey />
            <a href="/permisos" className="hover:text-gray-300 transition">
              Permisos
            </a>
          </li>
        </ul>

        {/* Perfil */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 hover:text-gray-300 transition focus:outline-none"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <FaUserCircle className="text-2xl" />
            <span>Perfil</span>
          </button>

          {/* Menú desplegable */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
              <a
                href="/perfil"
                className="block px-4 py-2 text-sm hover:bg-gray-200 transition"
              >
                Ver Perfil
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
