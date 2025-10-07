import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AdminHistoryItem from "../../components/history/AdminHistoryItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import { getAllReservationHistory } from "../../services/reservation/reservation";
import { useUser } from "../../context/UserContext";

// Página administrativa que muestra el historial completo de reservas realizadas por todos los usuarios
export default function AdminSuggestionPage() {
  const { user } = useUser(); // Usuario autenticado desde el contexto global

  const [historyData, setHistoryData] = useState([]); // Lista de registros históricos formateados
  const [loading, setLoading] = useState(true); // Estado de carga para controlar renderizado condicional

  /**
   * Efecto que se ejecuta al montar el componente.
   * Solicita al backend el historial completo de reservas.
   * Formatea cada entrada para visualización en el componente AdminHistoryItem.
   */
  useEffect(() => {
    getAllReservationHistory()
      .then((res) => {
        const historial = res.data?.historial || [];

        const mapped = historial.map((h) => ({
          cover: h.libro?.portadaUrl || "/covers/default.jpg", // Ruta relativa válida para portada
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
          usuario: h.usuario || null, // Información del usuario asociado a la reserva
        }));

        setHistoryData(mapped);
      })
      .catch((err) => {
        console.error("Error al obtener historial completo:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * Traduce acciones técnicas a etiquetas comprensibles para el usuario.
   * @param {string} accion - Acción técnica recibida desde el backend
   * @returns {string} - Etiqueta legible para la interfaz
   */
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Botón para volver al perfil del usuario */}
        <BackToProfileButton />

        {/* Título principal de la sección */}
        <h2 className="text-2xl font-bold">Historial completo de reservas</h2>

        {/* Renderizado condicional según estado de carga y existencia de registros */}
        {loading ? (
          <p className="text-gray-500">Cargando historial...</p>
        ) : historyData.length > 0 ? (
          <ul className="space-y-4">
            {historyData.map((item, index) => (
              <AdminHistoryItem key={index} book={item} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay registros disponibles.</p>
        )}
      </div>
    </MainLayout>
  );
}