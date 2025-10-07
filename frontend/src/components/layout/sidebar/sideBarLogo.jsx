// src/components/layout/sidebar/sideLogo.jsx
import { Link } from "react-router-dom";

// Componente que muestra el logotipo institucional en la barra lateral
export default function SidebarLogo() {
  return (
    <Link
      to="/" // Redirige al inicio al hacer clic en el logotipo
      className="flex items-center justify-center w-full h-24"
    >
      <img
        src="/assets/Scriptum-logo.png" // Ruta relativa al archivo de imagen
        alt="Logo de biblioteca" // Texto alternativo para accesibilidad
        className="h-[180px] w-auto object-contain" // Ajuste visual del logotipo
      />
    </Link>
  );
}