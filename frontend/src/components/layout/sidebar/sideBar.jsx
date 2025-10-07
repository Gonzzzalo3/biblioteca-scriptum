// src/components/layout/sidebar/sideBar.jsx
import SidebarLogo from "./sideBarLogo";
import SidebarNav from "./sideBarNav";

// Componente que representa la barra lateral fija de navegación
export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#c7ffbe] text-gray-800 flex flex-col">
      {/* Sección superior con logotipo */}
      <SidebarLogo />

      {/* Sección inferior con navegación */}
      <SidebarNav />
    </aside>
  );
}