import MainLayout from "../../layouts/MainLayout";
import HistoryList from "../../components/history/historyList";

export default function HistoryPage() {
  const isLoggedIn = true;
  const user = { name: "Gonzalo Cáceres", email: "gonzalo@example.com" };

  const historyData = [
    {
      cover: "/covers/libro1.jpg",
      title: "Libro 1",
      author: "Autor",
      code: "XX-XXXX",
      action: "Devuelto",
      date: "2025-09-10",
      dueDate: "2025-09-17",
    },
    {
      cover: "/covers/libro2.jpg",
      title: "Libro 2",
      author: "Autor",
      code: "YY-YYYY",
      action: "Recogido",
      date: "2025-09-05",
      dueDate: "2025-09-15",
    },
    {
      cover: "/covers/libro3.jpg",
      title: "Libro 3",
      author: "Autor",
      code: "ZZ-ZZZZ",
      action: "Reservado",
      date: "2025-09-01",
    },
  ];

  return (
    <MainLayout isLoggedIn={isLoggedIn} user={user}>
      <HistoryList title="Historial de acciones" books={historyData} />
    </MainLayout>
  );
}