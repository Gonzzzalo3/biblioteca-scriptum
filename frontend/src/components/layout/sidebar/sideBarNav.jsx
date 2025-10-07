// src/components/layout/sidebar/sideBarNav.jsx
import { useUser } from "../../../context/UserContext";
import SidebarNavItem from "./sideBarNavItem";
import { ROLES } from "../../../utils/constants";
import {
  FaBook,
  FaHistory,
  FaLightbulb,
  FaSignOutAlt,
  FaQuestionCircle,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";

// Componente que define la navegación lateral según el rol del usuario
export default function SidebarNav() {
  const { user } = useUser(); // Obtiene el usuario desde el contexto global
  const esCliente = user?.rol === ROLES.CLIENTE;
  const esBibliotecario = user?.rol === ROLES.BIBLIOTECARIO;

  return (
    <div className="flex flex-col justify-between flex-1 h-full">
      {/* Navegación principal con scroll independiente */}
      <nav className="flex flex-col gap-2 p-4 border-t border-gray-400/40 overflow-y-auto">
        <SidebarNavItem to="/" label="Libros" icon={FaBook} />

        {/* Opciones exclusivas para clientes */}
        {esCliente && (
          <>
            <SidebarNavItem to="/reservation" label="Reservas" icon={MdAssignmentReturn} />
            <SidebarNavItem to="/history" label="Historial" icon={FaHistory} />
            <SidebarNavItem to="/suggestion" label="Enviar Sugerencias" icon={FaLightbulb} />
          </>
        )}

        {/* Opciones exclusivas para bibliotecarios */}
        {esBibliotecario && (
          <>
            <SidebarNavItem to="/admin/reservations" label="Historial de Reservas" icon={FaClipboardList} />
            <SidebarNavItem to="/admin/clients" label="Lista de Clientes" icon={FaUsers} />
            <SidebarNavItem to="/admin/suggestions" label="Ver Sugerencias" icon={FaLightbulb} />
          </>
        )}
        {/* Este bloque puede crecer sin afectar el layout general */}
      </nav>

      {/* Navegación inferior fija */}
      <div className="flex flex-col gap-2 p-4 border-t border-gray-400/40">
        <SidebarNavItem to="/help" label="Ayuda" icon={FaQuestionCircle} />
        <SidebarNavItem to="/logout" label="Cerrar sesión" type="logout" icon={FaSignOutAlt} />
      </div>
    </div>
  );
}