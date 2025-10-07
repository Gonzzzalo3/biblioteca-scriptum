// src/components/suggestions/suggestionForm.jsx
import { useState } from "react";
import SuggestionTypeSelect from "./suggestionTypeSelect";
import SuggestionTextArea from "./suggestionTextArea";

// Componente que permite al usuario enviar una sugerencia con tipo y detalle
export default function SuggestionForm({ onSubmit }) {
  // Estado para el tipo de sugerencia seleccionada
  const [tipo, setTipo] = useState("");

  // Estado para el contenido textual de la sugerencia
  const [detalles, setDetalles] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipo || !detalles.trim()) {
      alert("Por favor complete todos los campos.");
      return;
    }
    onSubmit({ tipo, detalles }); // Llama a la función externa con los datos
    setTipo(""); // Resetea el tipo seleccionado
    setDetalles(""); // Resetea el campo de texto
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-6"
    >
      {/* Selector de tipo de sugerencia */}
      <SuggestionTypeSelect
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      {/* Área de texto para los detalles de la sugerencia */}
      <SuggestionTextArea
        value={detalles}
        onChange={(e) => setDetalles(e.target.value)}
      />

      {/* Botón para enviar la sugerencia */}
      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Enviar
      </button>
    </form>
  );
}