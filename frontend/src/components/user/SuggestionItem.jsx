import { SUGGESTION_TYPES } from "../../utils/constants";

const typeLabels = {
  [SUGGESTION_TYPES.LIBRO_RECOMENDADO]: "Libro recomendado",
  [SUGGESTION_TYPES.ERROR_EN_CONTENIDO]: "Error en contenido",
  [SUGGESTION_TYPES.MEJORA_VISUAL]: "Mejora visual",
  [SUGGESTION_TYPES.FUNCIONALIDAD_NUEVA]: "Funcionalidad nueva",
  [SUGGESTION_TYPES.EXPERIENCIA_USUARIO]: "Experiencia de usuario",
  [SUGGESTION_TYPES.GESTION_BIBLIOTECA]: "Gestión de biblioteca",
};

export default function SuggestionItem({ suggestion }) {
  return (
    <li className="flex gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Imagen del usuario */}
      <img
        src={suggestion.userImage}
        alt={suggestion.userName}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Nombre y tipo */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{suggestion.userName}</h4>
          <span className="text-sm text-gray-600">
            {typeLabels[suggestion.type] || "Sin categoría"}
          </span>
        </div>

        {/* Detalles */}
        <p className="text-gray-700 mt-2">{suggestion.details}</p>
      </div>
    </li>
  );
}