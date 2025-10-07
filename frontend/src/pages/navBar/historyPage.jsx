import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import HistoryList from "../../components/history/historyList";
import { getUserReservationHistory } from "../../services/reservation/reservation";
import { useUser } from "../../context/UserContext";

// Página que muestra el historial de acciones realizadas por el usuario sobre sus reservas
export default function HistoryPage() {
  const { user } = useUser(); // Obtiene el usuario autenticado desde el contexto

  const [historyData, setHistoryData] = useState([]); // Lista de eventos históricos
  const [loading, setLoading] = useState(true); // Estado de carga para mostrar feedback visual

  // Carga el historial de reservas del usuario al montar el componente
  useEffect(() => {
    getUserReservationHistory()
      .then((res) => {
        const historial = res.data?.historial || [];

        // Mapea los datos recibidos a un formato visualmente útil
        const mapped = historial.map((h) => ({
          cover: h.libro?.portadaUrl || "/covers/default.jpg", // Imagen de portada o por defecto
          title: h.libro?.titulo || "Sin título",
          author: h.libro?.autor || "Desconocido",
          code: `RES-${h.id_reserva || "???"}`, // Código de reserva con fallback
          rawAction: h.accion?.toLowerCase(), // Acción original para lógica interna
          action: mapAction(h.accion), // Acción traducida para mostrar al usuario
          date: h.fecha_evento
            ? new Date(h.fecha_evento).toLocaleDateString()
            : "Sin fecha",
          dueDate: h.fecha_fin
            ? new Date(h.fecha_fin).toLocaleDateString()
            : null,
        }));

        setHistoryData(mapped);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Traduce acciones técnicas a etiquetas comprensibles para el usuario
  const mapAction = (accion) => {
    switch (accion?.toLowerCase()) {
      case "creado":
        return "Reservado";
      case "prestado":
        return "Recogido";
      case "devuelto":
        return "Devuelto";
      case "cancelado":
        return "Cancelado";
      default:
        return accion || "Desconocido";
    }
  };

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      {loading ? (
        <p className="text-center text-gray-500">Cargando historial...</p>
      ) : (
        <HistoryList title="Historial de acciones" books={historyData} />
      )}
    </MainLayout>
  );
}