import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ReservationList from "../../components/reservations/ReservationList";
import { getUserReservations } from "../../services/reservation/reservation";
import { useUser } from "../../context/UserContext";

const RESERVATION_STATUS = {
  RESERVADO: "reservado",
  PRESTADO: "prestado",
  CANCELADO: "cancelado",
  DEVUELTO: "devuelto",
};

export default function ReservationPage() {
  const { user } = useUser();
  const [pendingReservations, setPendingReservations] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    getUserReservations()
      .then((res) => {
        const reservas = res.data?.reservas || [];
        const pending = [];
        const active = [];

        reservas
          .filter((r) =>
            [RESERVATION_STATUS.RESERVADO, RESERVATION_STATUS.PRESTADO].includes(
              r.estado.toLowerCase()
            )
          )
          .forEach((r) => {
            const bookData = r.Exemplary?.Book || {};
            const fechaFin = r.fecha_fin ? new Date(r.fecha_fin) : null;
            const hoy = new Date();
            let status = "";

            if (r.estado.toLowerCase() === RESERVATION_STATUS.RESERVADO) {
              status = fechaFin && fechaFin < hoy ? "Vencido" : "Reservado";
              pending.push({
                cover: bookData.portadaUrl || "/covers/default.jpg",
                title: bookData.titulo || "Sin título",
                author: bookData.autor || "Desconocido",
                code: `RES-${r.id}`,
                status,
                dueDate: fechaFin ? fechaFin.toLocaleDateString() : "Sin fecha",
              });
            }

            if (r.estado.toLowerCase() === RESERVATION_STATUS.PRESTADO) {
              status = fechaFin && fechaFin < hoy ? "Vencido" : "En posesión";
              active.push({
                cover: bookData.portadaUrl || "/covers/default.jpg",
                title: bookData.titulo || "Sin título",
                author: bookData.autor || "Desconocido",
                code: `RES-${r.id}`,
                status,
                dueDate: fechaFin ? fechaFin.toLocaleDateString() : "Sin fecha",
              });
            }
          });

        setPendingReservations(pending);
        setActiveLoans(active);
      })
      .catch((err) => {
        console.error("Error al obtener reservas:", err);
      })
      .finally(() => setLoading(false));
  };

 
  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      {loading ? (
        <p className="text-center text-gray-500">Cargando reservas...</p>
      ) : (
        <div className="space-y-8">
          <ReservationList
            title="Reservas pendientes"
            books={pendingReservations}
            onCancel={loadData}
          />
          <ReservationList title="Préstamos activos" books={activeLoans} />
        </div>
      )}
    </MainLayout>
  );
}