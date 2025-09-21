import { SUGGESTION_TYPES } from "../../utils/constants";

export default function SuggestionTypeSelect({ value, onChange }) {
  const options = [
    { label: "Libro recomendado", value: SUGGESTION_TYPES.LIBRO_RECOMENDADO },
    { label: "Error en contenido", value: SUGGESTION_TYPES.ERROR_EN_CONTENIDO },
    { label: "Mejora visual", value: SUGGESTION_TYPES.MEJORA_VISUAL },
    { label: "Funcionalidad nueva", value: SUGGESTION_TYPES.FUNCIONALIDAD_NUEVA },
    { label: "Experiencia de usuario", value: SUGGESTION_TYPES.EXPERIENCIA_USUARIO },
    { label: "Gestión de biblioteca", value: SUGGESTION_TYPES.GESTION_BIBLIOTECA },
  ];

  return (
    <div>
      <label className="block font-semibold mb-2">Tipo de sugerencia:</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded p-2"
      >
        <option value="">Seleccione a qué irá enfocada su sugerencia</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}