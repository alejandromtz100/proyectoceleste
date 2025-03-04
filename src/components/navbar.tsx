import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillAlt,
  FaKey,
  FaClipboardList,
  FaChartLine,
  FaBuilding,
  FaUserCircle,
  FaBell,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import "../css/Navbar.css";

const Navbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [role, setRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  // Obtención de datos del usuario utilizando el token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) {
          navigate("/login");
          return;
        }
  
        const response = await fetch(
          `https://apireact-1-88m9.onrender.com/api/users/me/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": token,
            },
          }
        );
  
        if (!response.ok) {
          if (response.status === 401) {
            // Si el token no es válido o no existe en la base de datos, cerrar sesión
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login");
            return;
          }
          throw new Error("Error al obtener los datos del usuario");
        }
  
        const userData = await response.json();
        setRole(userData.role);
        setUserName(userData.name);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        navigate("/login");
      }
    };
  
    fetchUserData();
  }, [navigate]);

  // Función para obtener notificaciones (incluye el token en los headers)
  const fetchNotifications = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    try {
      const response = await fetch(
        `https://apireact-1-88m9.onrender.com/api/notifications/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener notificaciones");
      }

      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: any) => !n.isRead).length);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // Función para cerrar sesión, enviando el token y eliminando datos de autenticación
  const handleLogout = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://apireact-1-88m9.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || "",
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Si el token no es válido o no existe en la base de datos, cerrar sesión
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
          return;
        }
        throw new Error("Error al cerrar sesión");
      }
  
      // Elimina los datos de autenticación del localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
  
      // Simula una animación de cierre de sesión
      setTimeout(() => {
        setIsLoggingOut(false);
        setIsLoggedOut(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }, 2000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setIsLoggingOut(false);
    }
  };

  // Función para marcar una notificación como leída
  const handleNotificationRead = async (notificationId: string) => {
    try {
      const response = await fetch(
        `https://apireact-1-88m9.onrender.com/api/notificati0ons/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isRead: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al marcar notificación como leída");
      }

      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error);
    }
  };

  const toggleNotificationsModal = () => {
    setIsNotificationsModalOpen(!isNotificationsModalOpen);
  };

  const goToNotificationsPage = () => {
    navigate("/notificaciones");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-3xl font-extrabold cursor-pointer flex items-center space-x-3">
          <a href="" className="hover:underline">
            Condo<span className="text-yellow-300">Web</span>
          </a>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg">
          {role === "user" && (
            <>
              <li className="flex items-center space-x-2">
                <FaHome />
                <a href="/Dashboard" className="hover:text-yellow-300 transition">
                  Home
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaMoneyBillAlt />
                <a href="/pagos" className="hover:text-yellow-300 transition">
                  Pagos
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaKey />
                <a href="/permisos" className="hover:text-yellow-300 transition">
                  Permisos
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaBuilding />
                <a href="/condominios" className="hover:text-yellow-300 transition">
                  Condominios
                </a>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li className="flex items-center space-x-2">
                <FaHome />
                <a href="/inicioadmin" className="hover:text-yellow-300 transition">
                  Home
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaClipboardList />
                <a href="/crud" className="hover:text-yellow-300 transition">
                  Registros
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaChartLine />
                <a href="/montos" className="hover:text-yellow-300 transition">
                  Multas
                </a>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center space-x-6">
          {/* Notificaciones */}
          <div className="relative">
            <button
              className="relative flex items-center space-x-2 focus:outline-none"
              onClick={toggleNotificationsModal}
            >
              <FaBell className="text-2xl" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsModalOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white text-gray-800 rounded-lg shadow-lg py-4 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-lg font-semibold">Notificaciones</p>
                </div>
                {notifications.length === 0 ? (
                  <p className="px-4 py-3 text-sm">No tienes notificaciones.</p>
                ) : (
                  <>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.slice(0, 3).map((notification) => (
                        <li
                          key={notification._id}
                          className={`p-4 border-b ${
                            notification.isRead ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <p className="font-bold">{notification.message}</p>
                          {notification.montoId && (
                            <>
                              <p>
                                <span className="font-semibold">Descripción: </span>
                                {notification.montoId.description}
                              </p>
                              <p>
                                <span className="font-semibold">Monto: </span>$
                                {notification.montoId.amount}
                              </p>
                              <p>
                                <span className="font-semibold">Fecha: </span>
                                {new Date(notification.montoId.date).toLocaleDateString()}
                              </p>
                              <p>
                                <span className="font-semibold">Departamento: </span>
                                {notification.montoId.department}
                              </p>
                            </>
                          )}
                          {!notification.isRead && (
                            <button
                              onClick={() => handleNotificationRead(notification._id)}
                              className="mt-2 text-blue-500"
                            >
                              Marcar como leída
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    {notifications.length > 3 && (
                      <button
                        onClick={goToNotificationsPage}
                        className="w-full text-center py-3 text-blue-500 hover:bg-gray-100 transition"
                      >
                        Ver más
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Perfil */}
          <div className="relative">
            <button
              className="flex items-center space-x-3 hover:text-yellow-300 transition focus:outline-none"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <FaUserCircle className="text-3xl" />
              <span className="text-lg font-medium">
                Hola, {userName || "Cargando..."}
              </span>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-4 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-lg font-semibold">Perfil</p>
                  <p className="text-sm text-gray-600">{userName || "Usuario"}</p>
                </div>
                <a
                  href="/perfil"
                  className="block px-4 py-3 text-sm hover:bg-gray-100 transition"
                >
                  Ver Perfil
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animación de Cierre de Sesión */}
      {(isLoggingOut || isLoggedOut) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loading-animation active">
            {isLoggingOut && (
              <>
                <div className="spinner"></div>
                <p className="loading-text">Cerrando sesión...</p>
              </>
            )}
            {isLoggedOut && (
              <>
                <FaSignOutAlt className="logout-icon" />
                <p className="success-message active">Sesión cerrada</p>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
