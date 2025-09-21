import MainLayout from "../../layouts/MainLayout";
import SuggestionForm from "../../components/suggestions/suggestionForm";

export default function SuggestionsPage() {
  const isLoggedIn = true;
  const user = { name: "Gonzalo Cáceres", email: "gonzalo@example.com" };

  const handleSuggestionSubmit = (data) => {
    console.log("Sugerencia enviada:", data);
    alert("Gracias por su sugerencia. La hemos recibido correctamente.");
  };

  return (
    <MainLayout isLoggedIn={isLoggedIn} user={user}>
      <h1 className="text-2xl font-bold mb-6">Enviar sugerencia</h1>
      <SuggestionForm onSubmit={handleSuggestionSubmit} />
    </MainLayout>
  );
}