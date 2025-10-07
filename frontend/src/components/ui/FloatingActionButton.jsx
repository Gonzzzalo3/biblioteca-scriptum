// src/components/ui/FloatingActionButton.jsx
import { FaPen } from "react-icons/fa";

// Componente que representa un botón flotante de acción rápida
export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick} // Acción que se ejecuta al hacer clic
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition"
      title="Quick Admin" // Texto informativo al pasar el cursor
    >
      <FaPen size={20} /> {/* Ícono de lápiz para indicar edición o acción */}
    </button>
  );
}