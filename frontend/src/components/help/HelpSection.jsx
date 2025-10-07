// src/components/help/HelpSection.jsx
import { useState } from "react";

// Componente que agrupa elementos de ayuda en una sección desplegable
export default function HelpSection({ title, children }) {
  // Estado para controlar si la sección está expandida o colapsada
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md shadow-sm mb-4">
      {/* Encabezado interactivo de la sección */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold text-gray-800 flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {/* Contenido visible solo si la sección está expandida */}
      {open && (
        <div className="px-4 py-3 text-gray-700 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}