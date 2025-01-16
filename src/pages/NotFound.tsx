import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-700">404</h1>
        <p className="mt-2 text-lg text-gray-600">Página no encontrada</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
