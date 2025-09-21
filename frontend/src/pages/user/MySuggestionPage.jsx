import MainLayout from "../../layouts/MainLayout";
import SuggestionItem from "../../components/user/suggestionItem";

export default function MySuggestionsPage() {
  const user = {
    name: "Gonzalo Mauricio",
    email: "Gonzalo.caceres@gmail.com",
    avatarUrl: "/users/gonzalo.jpg",
  };

  const suggestions = [
    {
      userName: user.name,
      userImage: user.avatarUrl,
      type: "mejora_visual",
      details: "Sería útil mejorar el contraste de los botones en modo oscuro.",
    },
    {
      userName: user.name,
      userImage: user.avatarUrl,
      type: "libro_recomendado",
      details: "Recomiendo añadir 'Clean Code' a la biblioteca de programación.",
    },
  ];

  return (
    <MainLayout isLoggedIn={true} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Mis sugerencias</h2>
        {suggestions.length > 0 ? (
          <ul className="space-y-4">
            {suggestions.map((s, i) => (
              <SuggestionItem key={i} suggestion={s} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aún no has enviado sugerencias.</p>
        )}
      </div>
    </MainLayout>
  );
}