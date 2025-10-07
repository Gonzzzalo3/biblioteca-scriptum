import { FaCommentDots, FaLightbulb } from "react-icons/fa";

// Componente que muestra accesos rápidos a la actividad del usuario: comentarios y sugerencias
export default function ActivityCard({ onViewComments, onViewSuggestions }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      {/* Título de la sección */}
      <h3 className="text-lg font-semibold border-b pb-2">Mi actividad</h3>

      {/* Botón para ver comentarios si la función está definida */}
      {onViewComments && (
        <button
          onClick={onViewComments} // Ejecuta la acción de visualización de comentarios
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition w-full"
        >
          <FaCommentDots /> Ver mis comentarios
        </button>
      )}

      {/* Botón para ver sugerencias si la función está definida */}
      {onViewSuggestions && (
        <button
          onClick={onViewSuggestions} // Ejecuta la acción de visualización de sugerencias
          className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition w-full"
        >
          <FaLightbulb /> Ver mis sugerencias
        </button>
      )}
    </div>
  );
}