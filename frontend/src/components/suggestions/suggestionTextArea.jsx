// src/components/suggestions/suggestionTextArea.jsx

// Componente que representa el área de texto para ingresar detalles de una sugerencia
export default function SuggestionTextArea({ value, onChange }) {
  return (
    <div>
      {/* Etiqueta descriptiva del campo */}
      <label className="block font-semibold mb-2">Detalles adicionales:</label>

      {/* Área de texto para ingresar contenido libre */}
      <textarea
        value={value} // Valor actual del campo
        onChange={onChange} // Función que actualiza el estado al escribir
        placeholder="Cuéntenos un poco más acerca de su sugerencia..." // Texto guía para el usuario
        className="w-full border border-gray-300 rounded p-2 h-32 resize-none" // Estilos visuales del campo
      />
    </div>
  );
}