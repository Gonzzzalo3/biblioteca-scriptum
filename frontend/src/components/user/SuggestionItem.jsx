import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SUGGESTION_TYPES } from "../../utils/constants";
import { Link } from "react-router-dom";

// Diccionario de etiquetas legibles para cada tipo de sugerencia
const typeLabels = {
  [SUGGESTION_TYPES.LIBRO_RECOMENDADO]: "Libro recomendado",
  [SUGGESTION_TYPES.ERROR_EN_CONTENIDO]: "Error en contenido",
  [SUGGESTION_TYPES.MEJORA_VISUAL]: "Mejora visual",
  [SUGGESTION_TYPES.FUNCIONALIDAD_NUEVA]: "Funcionalidad nueva",
  [SUGGESTION_TYPES.EXPERIENCIA_USUARIO]: "Experiencia de usuario",
  [SUGGESTION_TYPES.GESTION_BIBLIOTECA]: "Gestión de biblioteca",
};

// Componente que representa una sugerencia individual con opción de edición y eliminación
export default function SuggestionItem({
  suggestion,
  currentUserId,
  onEdit,
  onDelete,
}) {
  // Determina si el usuario actual es el autor de la sugerencia
  const isOwner = Number(suggestion.id_usuario) === Number(currentUserId);

  // Estados locales para edición
  const [isEditing, setIsEditing] = useState(false);
  const [tipo, setTipo] = useState(suggestion.type);
  const [detalles, setDetalles] = useState(suggestion.details);

  // Maneja la eliminación de la sugerencia con confirmación
  const handleDelete = () => {
    if (window.confirm("¿Seguro que quieres eliminar esta sugerencia?")) {
      onDelete(suggestion.id);
    }
  };

  // Maneja el guardado de los cambios realizados en la sugerencia
  const handleSave = () => {
    if (!tipo || !detalles.trim()) return;
    onEdit(suggestion.id, { tipo, detalles });
    setIsEditing(false);
  };

  return (
    <li className="flex gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Imagen del usuario que hizo la sugerencia */}
      <img
        src={suggestion.userImage}
        alt={suggestion.userName}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Encabezado con nombre del usuario y acciones */}
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${suggestion.id_usuario}`} // Enlace al perfil del autor
            className="font-semibold text-blue-600 hover:underline"
          >
            {suggestion.userName}
          </Link>

          <div className="flex items-center gap-2">
            {/* Acciones disponibles solo para el autor */}
            {isOwner && (
              <>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700"
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Editar"
                >
                  <FaEdit />
                </button>
              </>
            )}
            {/* Etiqueta del tipo de sugerencia (solo si no está en modo edición) */}
            {!isEditing && (
              <span className="text-sm text-gray-600">
                {typeLabels[suggestion.type] || "Sin categoría"}
              </span>
            )}
          </div>
        </div>

        {/* Área editable si el usuario está modificando la sugerencia */}
        {isEditing ? (
          <div className="mt-3 space-y-2">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Seleccione un tipo</option>
              {Object.entries(typeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <textarea
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              className="w-full border rounded p-2"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTipo(suggestion.type);
                  setDetalles(suggestion.details);
                }}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mt-2">{suggestion.details}</p> // Detalle de la sugerencia en modo lectura
        )}
      </div>
    </li>
  );
}