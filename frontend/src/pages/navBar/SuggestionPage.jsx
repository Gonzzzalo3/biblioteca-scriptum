import MainLayout from "../../layouts/MainLayout";
import SuggestionForm from "../../components/suggestions/suggestionForm";
import { createSuggestion } from "../../services/suggestion/suggestion";
import { useUser } from "../../context/UserContext";

// Página que permite al usuario enviar sugerencias sobre libros o mejoras del sistema
export default function SuggestionsPage() {
  const { user } = useUser(); // Usuario autenticado desde el contexto

  // Maneja el envío del formulario de sugerencias
  const handleSuggestionSubmit = (data) => {
    createSuggestion(data)
      .then((res) => {
        alert(res.data?.mensaje || "Sugerencia enviada correctamente.");
      })
      .catch((err) => {
        console.error("Error al enviar sugerencia:", err);
        alert(
          err.response?.data?.mensaje ||
            "Ocurrió un error al enviar la sugerencia."
        );
      });
  };

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <h1 className="text-2xl font-bold mb-6">Enviar sugerencia</h1>
      <SuggestionForm onSubmit={handleSuggestionSubmit} />
    </MainLayout>
  );
}