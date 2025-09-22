import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import SuggestionItem from "../../components/user/suggestionItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import { listOwnSuggestions, updateSuggestion, deleteOwnSuggestion } from "../../services/suggestion/suggestion";
import { useUser } from "../../context/UserContext";

export default function MySuggestionsPage() {
  const { user } = useUser();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    listOwnSuggestions()
      .then((res) => {
        const data = res.data?.sugerencias || [];
        const mapped = data.map((s) => ({
          id: s.id,
          id_usuario: s.id_usuario,
          userName: `${s.User?.nombres || ""} ${s.User?.apellidos || ""}`,
          userImage: s.User?.img || "/img/usuarios/default.jpg",
          type: s.tipo,
          details: s.detalles,
          fecha: s.createdAt
        }));
        setSuggestions(mapped);
      })
      .catch((err) => {
        console.error("Error al cargar sugerencias propias:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditSuggestion = (id, data) => {
    updateSuggestion(id, data).then(loadData);
  };

  const handleDeleteSuggestion = (id) => {
    deleteOwnSuggestion(id).then(loadData);
  };

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        <BackToProfileButton />
        <h2 className="text-2xl font-bold">Mis sugerencias</h2>

        {loading ? (
          <p className="text-gray-500">Cargando sugerencias...</p>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-4">
            {suggestions.map((s) => (
              <SuggestionItem
                key={s.id}
                suggestion={s}
                currentUserId={user?.id}
                onEdit={handleEditSuggestion}
                onDelete={handleDeleteSuggestion}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aún no has enviado sugerencias.</p>
        )}
      </div>
    </MainLayout>
  );
}