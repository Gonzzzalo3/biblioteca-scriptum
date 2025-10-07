import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ReservationList from "../../components/reservations/ReservationList";
import {
  getActiveReservations,
  lendReservation,
  returnReservation,
} from "../../services/reservation/reservation";
import { useUser } from "../../context/UserContext";

// Estados relevantes para clasificar reservas activas
const RESERVATION_STATUS = {
  RESERVADO: "reservado",
  PRESTADO: "prestado",
};

// Página administrativa que muestra todas las reservas activas y vencidas de los usuarios
export default function AdminActiveReservationsPage() {
  const { user } = useUser();

  const [vencidas, setVencidas] = useState([]); // Reservas vencidas
  const [activas, setActivas] = useState([]); // Reservas vigentes
  const [loading, setLoading] = useState(true); // Estado de carga

  // Carga y clasifica las reservas activas según fecha y estado
  const loadData = () => {
    setLoading(true);

    getActiveReservations()
      .then((res) => {
        const reservas = res.data?.reservas || [];
        const vencidasTemp = [];
        const activasTemp = [];
        const hoy = new Date();

        reservas.forEach((r) => {
          const bookData = r.Exemplary?.Book || {};
          const fechaFin = r.fecha_fin ? new Date(r.fecha_fin) : null;
          const estado = r.estado?.toLowerCase();
          const vencida = fechaFin && fechaFin < hoy;

          const item = {
            cover: bookData.portadaUrl || "/img/libros/default.jpg",
            title: bookData.titulo || "Sin título",
            author: bookData.autor || "Desconocido",
            code: `RES-${r.id}`,
            status: vencida
              ? "Vencido"
              : estado === RESERVATION_STATUS.PRESTADO
              ? "En posesión"
              : "Reservado",
            estadoRaw: estado,
            dueDate: fechaFin ? fechaFin.toLocaleDateString() : "Sin fecha",
            userId: r.User?.id,
            userName: `${r.User?.nombres || ""} ${r.User?.apellidos || ""}`,
            userImage: r.User?.imgUrl || "/img/usuarios/default.jpg",
          };

          if (vencida) {
            vencidasTemp.push(item);
          } else {
            activasTemp.push(item);
          }
        });

        setVencidas(vencidasTemp);
        setActivas(activasTemp);
      })
      .catch(() => {
        // Silencioso por diseño
      })
      .finally(() => setLoading(false));
  };

  // Confirma el préstamo de una reserva
  const handleConfirm = async (reserva) => {
    const id = reserva.code?.replace("RES-", "");
    if (!id) return;

    const confirm = window.confirm(
      "¿Deseas confirmar el préstamo de este ejemplar?"
    );
    if (!confirm) return;

    try {
      await lendReservation(id);
      alert("Préstamo confirmado correctamente.");
      loadData();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al confirmar el préstamo.");
    }
  };

  // Confirma la devolución de una reserva
  const handleReturn = async (reserva) => {
    const id = reserva.code?.replace("RES-", "");
    if (!id) return;

    const confirm = window.confirm(
      "¿Deseas confirmar la devolución de este ejemplar?"
    );
    if (!confirm) return;

    try {
      await returnReservation(id);
      alert("Devolución confirmada correctamente.");
      loadData();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al confirmar la devolución.");
    }
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Reservas activas de usuarios</h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando reservas...</p>
        ) : (
          <>
            <ReservationList
              title="Reservas y préstamos vencidos"
              books={vencidas}
              modo="bibliotecario"
              onConfirm={handleConfirm}
              onReturn={handleReturn}
              renderUser={(book) => (
                <Link
                  to={`/profile/${book.userId}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {book.userName}
                </Link>
              )}
            />
            <ReservationList
              title="Reservas y préstamos activos"
              books={activas}
              modo="bibliotecario"
              onConfirm={handleConfirm}
              onReturn={handleReturn}
              renderUser={(book) => (
                <Link
                  to={`/profile/${book.userId}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {book.userName}
                </Link>
              )}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}