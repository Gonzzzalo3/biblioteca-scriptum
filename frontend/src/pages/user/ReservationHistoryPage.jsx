// src/pages/admin/AdminSuggestionPage.jsx
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AdminHistoryItem from "../../components/history/AdminHistoryItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import { getAllReservationHistory } from "../../services/reservation/reservation";
import { useUser } from "../../context/UserContext";

export default function AdminSuggestionPage() {
  const { user } = useUser();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReservationHistory()
      .then((res) => {
        const historial = res.data?.historial || [];

        const mapped = historial.map((h) => ({
          cover: h.libro?.portadaUrl || "/covers/default.jpg",
          title: h.libro?.titulo || "Sin título",
          author: h.libro?.autor || "Desconocido",
          code: `RES-${h.id_reserva || "???"}`,
          rawAction: h.accion?.toLowerCase(),
          action: mapAction(h.accion),
          date: h.fecha_evento
            ? new Date(h.fecha_evento).toLocaleDateString()
            : "Sin fecha",
          dueDate: h.fecha_fin
            ? new Date(h.fecha_fin).toLocaleDateString()
            : null,
          usuario: h.usuario || null
        }));

        setHistoryData(mapped);
      })
      .catch((err) => {
        console.error("Error al obtener historial completo:", err);
      })
      .finally(() => setLoading(false));
  }, []);

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
        <BackToProfileButton />
        <h2 className="text-2xl font-bold">Historial completo de reservas</h2>

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