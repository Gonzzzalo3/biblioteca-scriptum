import { useState } from "react";
import SuggestionTypeSelect from "./suggestionTypeSelect";
import SuggestionTextArea from "./suggestionTextArea";
export default function SuggestionForm({ onSubmit }) {
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !details.trim()) {
      alert("Por favor complete todos los campos.");
      return;
    }
    onSubmit({ type, details });
    setType("");
    setDetails("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-6"
    >
      <SuggestionTypeSelect value={type} onChange={(e) => setType(e.target.value)} />
      <SuggestionTextArea value={details} onChange={(e) => setDetails(e.target.value)} />

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Enviar
      </button>
    </form>
  );
}