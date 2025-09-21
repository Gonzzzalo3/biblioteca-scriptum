import MainLayout from "../../layouts/MainLayout";
import ReservationList from "../../components/reservations/ReservationList";

export default function ReservationPage() {
  const isLoggedIn = true;
  const user = { name: "Gonzalo Cáceres", email: "gonzalo@example.com" };

  // Datos de ejemplo
  const pendingReservations = [
    {
      cover: "/covers/libro1.jpg",
      title: "Libro 1",
      author: "Autor",
      code: "XX-XXXX",
      status: "Reservado",
      dueDate: "20/09/2025",
    },
  ];

  const activeLoans = [
    {
      cover: "/covers/libro2.jpg",
      title: "Libro 2",
      author: "Autor",
      code: "YY-YYYY",
      status: "En posesión",
      dueDate: "25/09/2025",
    },
    {
      cover: "/covers/libro3.jpg",
      title: "Libro 3",
      author: "Autor",
      code: "ZZ-ZZZZ",
      status: "Vencido",
      dueDate: "15/09/2025",
    },
  ];

  return (
    <MainLayout isLoggedIn={isLoggedIn} user={user}>
      <div className="space-y-8">
        <ReservationList title="Reservas pendientes" books={pendingReservations} />
        <ReservationList title="Préstamos activos" books={activeLoans} />
      </div>
    </MainLayout>
  );
}