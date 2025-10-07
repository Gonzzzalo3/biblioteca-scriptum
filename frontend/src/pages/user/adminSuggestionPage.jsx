import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import SuggestionItem from "../../components/user/suggestionItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import { listAllSuggestions } from "../../services/suggestion/suggestion";
import { useUser } from "../../context/UserContext";

// Página administrativa que muestra todas las sugerencias enviadas por los usuarios
export default function AdminSuggestionPage() {
  const { user } = useUser();

  const [suggestions, setSuggestions] = useState([]); // Lista de sugerencias recibidas
  const [loading, setLoading] = useState(true); // Estado de carga para mostrar feedback visual

  // Carga todas las sugerencias desde el backend
  const loadData = () => {
    listAllSuggestions()
      .then((res) => {
        const data = res.data?.sugerencias || [];

        // Formatea cada sugerencia para visualización
        const mapped = data.map((s) => ({
          id: s.id,
          id_usuario: s.id_usuario,
          userName: `${s.User?.nombres || ""} ${s.User?.apellidos || ""}`,
          userImage: s.User?.imgUrl || "/img/usuarios/default.jpg",
          type: s.tipo,
          details: s.detalles,
          fecha: s.createdAt,
        }));

        setSuggestions(mapped);
      })
      .catch((err) => {
        console.error("Error al cargar sugerencias:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Maneja la edición de una sugerencia
  const handleEditSuggestion = (id, data) => {
    updateSuggestion(id, data).then(loadData);
  };

  // Maneja la eliminación de una sugerencia
  const handleDeleteSuggestion = (id) => {
    deleteSuggestion(id).then(loadData);
  };

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        <BackToProfileButton />
        <h2 className="text-2xl font-bold">Sugerencias recibidas</h2>

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
          <p className="text-gray-500">No hay sugerencias registradas.</p>
        )}
      </div>
    </MainLayout>
  );
}