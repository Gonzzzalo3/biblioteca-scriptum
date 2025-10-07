// src/components/ui/BackToProfileButton.jsx
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Componente que representa un botón para regresar al perfil del usuario
export default function BackToProfileButton() {
  const navigate = useNavigate(); // Hook para navegación programática

  return (
    <button
      onClick={() => navigate("/my-profile")} // Redirige al perfil del usuario
      className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-green-700 transition"
    >
      <FaArrowLeft className="w-4 h-4" /> {/* Ícono de flecha hacia la izquierda */}
      Volver al perfil
    </button>
  );
}