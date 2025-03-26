import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  loginPath?: string;
  adminPath?: string;
  userPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  loginPath = '/login',
  adminPath = '/inicioadmin',
  userPath = '/Dashboard'
}) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // Si no hay token (usuario no autenticado), redirigir al login
  if (!token || !role) {
    return <Navigate to={loginPath} replace />;
  }

  // Si el rol no está en los permitidos, redirigir según el rol
  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === 'admin' ? adminPath : userPath} replace />;
  }

  // Si el usuario tiene el rol permitido, renderiza la ruta
  return <Outlet />;
};

export default ProtectedRoute;