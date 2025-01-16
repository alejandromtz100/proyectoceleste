import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/navbar';
import Pagos from './nav/pagos';
import Montos from './nav/montos';
import Permisos from './nav/permisos';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Login onLogin={(phone, password) => console.log(phone, password)} />} />
        
        {/* Ruta para el registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Ruta para el dashboard (autenticación requerida) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />

        <Route path="/navbar" element={<Navbar />} />

        <Route path="/pagos" element={<Pagos />} />

        <Route path="/montos" element={<Montos />} />

        <Route path="/permisos" element={<Permisos />} />

      </Routes>
    </Router>
  );
};

export default App;
