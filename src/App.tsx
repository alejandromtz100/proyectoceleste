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
import Reset from './pages/reset';
import Restablecer from './pages/restablecer';
import ProtectedRoute from './Middleware/ProtectedRoute'; // Importar el componente ProtectedRoute

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

        {/* Rutas protegidas para usuarios normales */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/permisos" element={<Permisos />} />
        </Route>

        {/* Rutas protegidas para administradores */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/inicioadmin" element={<Inicioadmin />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/montos" element={<Montos />} />
        </Route>

        {/* Otras rutas de la aplicación */}
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/restablecer" element={<Restablecer />} />
      </Routes>
    </Router>
  );
};

export default App;