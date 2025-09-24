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

export default function SidebarNav() {
  const { user } = useUser();
  const esCliente = user?.rol === ROLES.CLIENTE;
  const esBibliotecario = user?.rol === ROLES.BIBLIOTECARIO;

  return (
    <div className="flex flex-col justify-between flex-1 h-full">
      {/* Bloque superior con scroll independiente */}
      <nav className="flex flex-col gap-2 p-4 border-t border-gray-400/40 overflow-y-auto">
        <SidebarNavItem to="/" label="Libros" icon={FaBook} />

        {esCliente && (
          <>
            <SidebarNavItem to="/reservation" label="Reservas" icon={MdAssignmentReturn} />
            <SidebarNavItem to="/history" label="Historial" icon={FaHistory} />
            <SidebarNavItem to="/suggestion" label="Enviar Sugerencias" icon={FaLightbulb} />
          </>
        )}

        {esBibliotecario && (
          <>
            <SidebarNavItem to="/admin/reservations" label="Historial de Reservas" icon={FaClipboardList} />
            <SidebarNavItem to="/admin/clients" label="Lista de Clientes" icon={FaUsers} />
            <SidebarNavItem to="/admin/suggestions" label="Ver Sugerencias" icon={FaLightbulb} />
          </>
        )}
        {/* Si agregas más items, solo esta parte hará scroll */}
      </nav>

      {/* Bloque inferior fijo */}
      <div className="flex flex-col gap-2 p-4 border-t border-gray-400/40">
        <SidebarNavItem to="/help" label="Ayuda" icon={FaQuestionCircle} />
        <SidebarNavItem to="/logout" label="Cerrar sesión" type="logout" icon={FaSignOutAlt} />
      </div>
    </div>
  );
}