// src/layouts/MainLayout.jsx
import Sidebar from "../components/layout/sidebar/sideBar";
import Header from "../components/layout/header";
import { useUser } from "../context/UserContext";

// Componente de layout principal para vistas protegidas del sistema
export default function MainLayout({ children }) {
  // Obtiene el estado del usuario desde el contexto global
  const { user, accessToken } = useUser();

  // Determina si el usuario está autenticado
  const isLoggedIn = Boolean(accessToken && user);

  return (
    <div className="min-h-screen flex">
      {/* Barra lateral fija */}
      <Sidebar />

      {/* Contenedor principal con margen izquierdo para evitar solapamiento */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Encabezado superior con información del usuario */}
        <Header isLoggedIn={isLoggedIn} user={user} />

        {/* Área de contenido dinámico */}
        <main className="flex-1 p-6 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}