import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const role = localStorage.getItem('role');

  if (!role || !allowedRoles.includes(role)) {
    // Redirige al usuario a la página correspondiente según su rol
    return <Navigate to={role === 'admin' ? '/inicioadmin' : '/Dashboard'} replace />;
  }

  // Si el usuario tiene el rol permitido, renderiza la ruta
  return <Outlet />;
};

export default ProtectedRoute;