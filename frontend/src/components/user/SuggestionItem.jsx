import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SUGGESTION_TYPES } from "../../utils/constants";

const typeLabels = {
  [SUGGESTION_TYPES.LIBRO_RECOMENDADO]: "Libro recomendado",
  [SUGGESTION_TYPES.ERROR_EN_CONTENIDO]: "Error en contenido",
  [SUGGESTION_TYPES.MEJORA_VISUAL]: "Mejora visual",
  [SUGGESTION_TYPES.FUNCIONALIDAD_NUEVA]: "Funcionalidad nueva",
  [SUGGESTION_TYPES.EXPERIENCIA_USUARIO]: "Experiencia de usuario",
  [SUGGESTION_TYPES.GESTION_BIBLIOTECA]: "Gestión de biblioteca",
};

export default function SuggestionItem({
  suggestion,
  currentUserId,
  onEdit,
  onDelete,
}) {
  const isOwner = Number(suggestion.id_usuario) === Number(currentUserId);
  const [isEditing, setIsEditing] = useState(false);
  const [tipo, setTipo] = useState(suggestion.type);
  const [detalles, setDetalles] = useState(suggestion.details);

  const handleDelete = () => {
    if (window.confirm("¿Seguro que quieres eliminar esta sugerencia?")) {
      onDelete(suggestion.id);
    }
  };

  const handleSave = () => {
    if (!tipo || !detalles.trim()) return;
    onEdit(suggestion.id, { tipo, detalles });
    setIsEditing(false);
  };

  return (
    <li className="flex gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Imagen del usuario */}
      <img
        src={suggestion.userImage}
        alt={suggestion.userName}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Nombre, tipo y acciones */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{suggestion.userName}</h4>
          <div className="flex items-center gap-2">
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
            {!isEditing && (
              <span className="text-sm text-gray-600">
                {typeLabels[suggestion.type] || "Sin categoría"}
              </span>
            )}
          </div>
        </div>

        {/* Contenido */}
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
          <p className="text-gray-700 mt-2">{suggestion.details}</p>
        )}
      </div>
    </li>
  );
}