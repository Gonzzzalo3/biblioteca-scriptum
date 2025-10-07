import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import SuggestionItem from "../../components/user/suggestionItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import {
  listOwnSuggestions,
  updateSuggestion,
  deleteOwnSuggestion,
} from "../../services/suggestion/suggestion";
import { useUser } from "../../context/UserContext";

// Página que muestra al usuario autenticado todas las sugerencias que ha enviado al sistema
export default function MySuggestionsPage() {
  const { user } = useUser(); // Obtiene el usuario actual desde el contexto global

  const [suggestions, setSuggestions] = useState([]); // Lista de sugerencias formateadas
  const [loading, setLoading] = useState(true); // Estado de carga para controlar renderizado condicional

  /**
   * Carga las sugerencias propias del usuario desde el backend.
   * Formatea cada entrada para visualización en el componente SuggestionItem.
   */
  const loadData = () => {
    listOwnSuggestions()
      .then((res) => {
        const data = res.data?.sugerencias || [];

        const mapped = data.map((s) => ({
          id: s.id,
          id_usuario: s.id_usuario,
          userName: `${s.User?.nombres || ""} ${s.User?.apellidos || ""}`,
          userImage: s.User?.imgUrl || "/img/usuarios/default.jpg", // Ruta relativa válida
          type: s.tipo,
          details: s.detalles,
          fecha: s.createdAt,
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

  /**
   * Efecto que se ejecuta al montar el componente.
   * Carga inicial de datos del usuario autenticado.
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Maneja la edición de una sugerencia.
   * Recarga los datos tras la actualización.
   * @param {number} id - ID de la sugerencia a editar
   * @param {object} data - Datos actualizados de la sugerencia
   */
  const handleEditSuggestion = (id, data) => {
    updateSuggestion(id, data).then(loadData);
  };

  /**
   * Maneja la eliminación de una sugerencia.
   * Recarga los datos tras la eliminación.
   * @param {number} id - ID de la sugerencia a eliminar
   */
  const handleDeleteSuggestion = (id) => {
    deleteOwnSuggestion(id).then(loadData);
  };

  return (
    <MainLayout isLoggedIn={!!user} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Botón para volver al perfil del usuario */}
        <BackToProfileButton />

        {/* Título principal de la sección */}
        <h2 className="text-2xl font-bold">Mis sugerencias</h2>

        {/* Renderizado condicional según estado de carga y existencia de sugerencias */}
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