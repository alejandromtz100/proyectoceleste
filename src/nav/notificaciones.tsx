import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';

const Notificationes: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }
  
      const response = await fetch(
        `https://apireact-1-88m9.onrender.com/api/notifications/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener notificaciones");
      }
  
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error al cargar las notificaciones:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Llamar a fetchNotifications inmediatamente al cargar el componente
    fetchNotifications();

    // Configurar un intervalo para llamar a fetchNotifications cada 60 segundos (60000 ms)
    const intervalId = setInterval(fetchNotifications, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleNotificationRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://apireact-1-88m9.onrender.com/api/notifications/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error);
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Cargando notificaciones...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
        {notifications.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`p-4 border rounded-lg ${
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
        )}
      </div>
    </>
  );
};

export default Notificationes;