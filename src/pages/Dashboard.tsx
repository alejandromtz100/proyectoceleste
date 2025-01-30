import React from 'react';
import Navbar from '../components/navbar';
import { FaEye } from 'react-icons/fa'; // Importar un ícono de React Icons

const Dashboard: React.FC = () => {
  // Array de ejemplo con datos de las casas
  const propiedades = [
    {
      id: 1,
      nombre: 'Casa en la playa',
      precio: '$250,000 USD',
      ubicacion: 'Cancún, México',
      imagen: 'https://content.elmueble.com/medio/2020/07/16/fachada-y-piscina-de-la-casa_db35886c_1268x1280.jpg',
    },
    {
      id: 2,
      nombre: 'Apartamento en la ciudad',
      precio: '$150,000 USD',
      ubicacion: 'Ciudad de México, México',
      imagen: 'https://soloanuncio.com/wp-content/uploads/2024/10/apartamento.jpeg',
    },
    {
      id: 3,
      nombre: 'Residencia de lujo',
      precio: '$500,000 USD',
      ubicacion: 'Monterrey, México',
      imagen: 'https://images.adsttc.com/media/images/5733/92ba/e58e/cee8/0800/004f/large_jpg/02.jpg?1462997678',
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gradient-to-br from-cyan-500 via-teal-600 to-blue-800"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(0, 255, 255, 0.8) 0%,
              rgba(0, 150, 150, 0.9) 50%,
              rgba(0, 50, 100, 1) 100%
            ),
            radial-gradient(
              circle at top left,
              rgba(0, 255, 255, 0.5) 0%,
              rgba(0, 255, 255, 0) 50%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(0, 150, 150, 0.5) 0%,
              rgba(0, 150, 150, 0) 50%
            )
          `,
        }}
      >
        {/* Ajustamos el padding-top para subir el título y el subtítulo aún más */}
        <div className="text-center pt-6"> {/* Cambiado de pt-8 a pt-6 */}
          <h1 className="text-5xl font-bold text-white font-sans">Bienvenido a CondoWeb</h1>
          <p className="mt-4 text-xl text-gray-100 font-light">
            Estas son unas de nuestras recomendaciones
          </p>
        </div>

        {/* Ajustamos el margen superior del contenedor de propiedades aún más */}
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 mt-6"> {/* Cambiado de mt-8 a mt-6 */}
          {propiedades.map((propiedad) => (
            <div
              key={propiedad.id}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200/20"
            >
              <img
                src={propiedad.imagen}
                alt={propiedad.nombre}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{propiedad.nombre}</h2>
                <p className="text-gray-600 text-lg mb-4">{propiedad.ubicacion}</p>
                <p className="text-xl font-bold text-cyan-600 mb-4">{propiedad.precio}</p>
                <button className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  <FaEye className="mr-2" />
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;