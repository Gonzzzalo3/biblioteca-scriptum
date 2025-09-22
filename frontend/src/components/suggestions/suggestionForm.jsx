import { useState } from "react";
import SuggestionTypeSelect from "./suggestionTypeSelect";
import SuggestionTextArea from "./suggestionTextArea";

export default function SuggestionForm({ onSubmit }) {
  const [tipo, setTipo] = useState("");
  const [detalles, setDetalles] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipo || !detalles.trim()) {
      alert("Por favor complete todos los campos.");
      return;
    }
    onSubmit({ tipo, detalles });
    setTipo("");
    setDetalles("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-6"
    >
      <SuggestionTypeSelect
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <SuggestionTextArea
        value={detalles}
        onChange={(e) => setDetalles(e.target.value)}
      />

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Enviar
      </button>
    </form>
  );
}