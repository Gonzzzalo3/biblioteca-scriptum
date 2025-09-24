// src/pages/admin/AdminUserOverviewPage.jsx
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import UserList from "../../components/user/UserList";
import { getAllUsersWithStatus } from "../../services";
import { useUser } from "../../context/UserContext";

export default function AdminUserOverviewPage() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsersWithStatus()
      .then((res) => {
        const data = res.data?.usuarios || [];

        const mapped = data.map((u) => ({
          id: u.id,
          nombres: `${u.nombres || ""} ${u.apellidos || ""}`.trim(),
          img: u.img || "http://localhost:3000/img/usuarios/default.jpg",
          vencimientos: u.vencimientos || 0,
          tieneReservas: u.tieneReservas || false,
        }));

        setUsers(mapped);
      })
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Panel de usuarios</h2>
        {loading ? (
          <p className="text-gray-500">Cargando usuarios...</p>
        ) : users.length > 0 ? (
          <UserList users={users} />
        ) : (
          <p className="text-gray-500">No hay usuarios registrados.</p>
        )}
      </div>
    </MainLayout>
  );
}
