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
} from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [role, setRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:4000/api/users/me${userId}`
        );

        if (!response.ok) {
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

  // Consulta las notificaciones cada 10 segundos
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/notifications/${userId}`
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
  
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
  
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
// para marcar una notificacion como leido
  const handleNotificationRead = async (notificationId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/notifications/${notificationId}`,
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
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-3xl font-extrabold cursor-pointer flex items-center space-x-3">
          <a href="/Dashboard" className="hover:underline">
            Condo<span className="text-yellow-300">Web</span>
          </a>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg">
          {role === "user" && (
            <>
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
                <a
                  href="/condominios"
                  className="hover:text-yellow-300 transition"
                >
                  Condominios
                </a>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
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
          {/* Notifications */}
          <div className="relative">
            <button
              className="relative flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
            >
              <FaBell className="text-2xl" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </button>
            {isNotificationMenuOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white text-gray-800 rounded-lg shadow-lg py-4 z-50">
                <h3 className="text-lg font-semibold px-4">Notificaciones</h3>
                {notifications.length === 0 ? (
  <p className="px-4 py-2 text-sm">No tienes notificaciones.</p>
) : (
  <ul>
    {notifications.map((notification) => (
      <li
        key={notification._id}
        className={`px-4 py-2 text-sm hover:bg-gray-100 ${
          notification.isRead ? "text-gray-500" : ""
        }`}
      >
        <p className="font-bold">{notification.message}</p>
        {notification.userId && (
          <p>
            <span className="font-semibold">Usuario: </span>
            {notification.userId.name}
          </p>
        )}
        {notification.montoId && (
          <>
            <p>
              <span className="font-semibold">Descripción: </span>
              {notification.montoId.description}
            </p>
            <p>
              <span className="font-semibold">Monto: </span>${notification.montoId.amount}
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
            className="text-blue-500 ml-2"
          >
            Marcar como leída
          </button>
        )}
      </li>
    ))}
  </ul>
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
    </nav>
  );
};

export default Navbar;
