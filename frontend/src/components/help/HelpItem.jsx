// src/components/help/HelpItem.jsx
import { useState } from "react";

// Componente que representa un ítem desplegable de ayuda o FAQ
export default function HelpItem({ title, content }) {
  // Estado para controlar si el contenido está expandido o colapsado
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md mb-2">
      {/* Botón que alterna la visibilidad del contenido */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {/* Contenido visible solo si el ítem está expandido */}
      {open && (
        <div className="px-4 py-3 text-sm text-gray-600 bg-gray-50 border-t">
          {content}
        </div>
      )}
    </div>
  );
}