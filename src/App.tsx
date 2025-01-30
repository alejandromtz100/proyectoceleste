import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Navbar from './components/navbar';
import Pagos from './nav/pagos';
import Montos from './nav/montos';
import Permisos from './nav/permisos';
import Crud from './nav/crud';
import Inicioadmin from './admin/inicioadmin';
import Notificaciones from './nav/notificaciones';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir de la ruta base (/) al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Ruta para la página de login */}
        <Route
          path="/login"
          element={<Login onLogin={(phone, password) => console.log(phone, password)} />}
        />

        {/* Ruta para el registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta para el dashboard (autenticación requerida) */}
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Otras rutas de la aplicación */}
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/montos" element={<Montos />} />
        <Route path="/permisos" element={<Permisos />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/inicioadmin" element={<Inicioadmin />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </Router>
  );
};

export default App;
