import React from 'react';
import Navbar from '../components/navbar';

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
      <div className="min-h-screen bg-gray-100">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">Bienvenido a CondoWeb</h1>
          <p className="mt-4 text-lg text-gray-600">Estas son unas de nuestras recomendaciones</p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {propiedades.map((propiedad) => (
            <div key={propiedad.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={propiedad.imagen} alt={propiedad.nombre} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{propiedad.nombre}</h2>
                <p className="text-gray-600 mt-2">{propiedad.ubicacion}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">{propiedad.precio}</p>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
