import SidebarNavItem from "./sideBarNavItem";
import { FaBook, FaHistory, FaLightbulb, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";

export default function SidebarNav() {
  return (
    <div className="flex flex-col justify-between flex-1 h-full">
      {/* Bloque superior con scroll independiente */}
      <nav className="flex flex-col gap-2 p-4 border-t border-gray-400/40 overflow-y-auto">
        <SidebarNavItem to="/" label="Libros" icon={FaBook} />
        <SidebarNavItem to="/loans" label="Reservas" icon={MdAssignmentReturn} />
        <SidebarNavItem to="/history" label="Historial" icon={FaHistory} />
        <SidebarNavItem to="/suggestions" label="Enviar Sugerencias" icon={FaLightbulb} />
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