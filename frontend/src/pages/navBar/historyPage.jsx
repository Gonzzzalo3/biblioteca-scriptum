import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import HistoryList from "../../components/history/historyList";
import { getUserReservationHistory } from "../../services/reservation/reservation";
import { useUser } from "../../context/UserContext";

export default function HistoryPage() {
  const { user } = useUser();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserReservationHistory()
      .then((res) => {
        const historial = res.data?.historial || [];

        const mapped = historial.map((h) => ({
          cover: h.libro?.portada || "/covers/default.jpg",
          title: h.libro?.titulo || "Sin título",
          author: h.libro?.autor || "Desconocido",
          code: `RES-${h.id_reserva || "???"}`,
          action: mapAction(h.accion), // traducimos la acción a texto amigable
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