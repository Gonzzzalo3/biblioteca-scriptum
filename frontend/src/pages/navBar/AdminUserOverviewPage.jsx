import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import UserList from "../../components/user/UserList";
import { getAllUsersWithStatus } from "../../services";
import { useUser } from "../../context/UserContext";

// Página administrativa que muestra el listado de usuarios registrados en el sistema
export default function AdminUserOverviewPage() {
  const { user } = useUser(); // Usuario autenticado desde el contexto

  const [users, setUsers] = useState([]); // Estado del listado de usuarios
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    getAllUsersWithStatus()
      .then((res) => {
        const data = res.data?.usuarios || [];

        // Construye el listado con datos relevantes
        const mapped = data.map((u) => {
          const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

          return {
            id: u.id,
            nombres: `${u.nombres || ""} ${u.apellidos || ""}`.trim(),
            img: u.img || `${baseUrl}/img/usuarios/default.jpg`, 
            vencimientos: u.vencimientos || 0,
            tieneReservas: u.tieneReservas || false,
          };
        });

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