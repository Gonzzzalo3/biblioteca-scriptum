import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import CommentItem from "../../components/bookDetail/commentItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import { getOwnComments } from "../../services/comment/comment";
import { useUser } from "../../context/UserContext";

// Página que muestra al usuario autenticado todos los comentarios que ha realizado sobre libros
export default function MyCommentsPage() {
  const { user } = useUser(); // Obtiene el usuario actual desde el contexto global

  const [comments, setComments] = useState([]); // Lista de comentarios formateados
  const [loading, setLoading] = useState(true); // Estado de carga para controlar renderizado condicional

  // Efecto que se ejecuta al montar el componente o cuando cambia el usuario
  useEffect(() => {
    getOwnComments()
      .then((res) => {
        const data = res.data?.comentarios || [];

        // Mapea cada comentario recibido desde el backend a un objeto visualmente útil
        const mapped = data.map((c) => ({
          id: c.id,
          id_usuario: c.id_usuario,
          contenido: c.contenido,
          calificacion: c.calificacion,
          fecha: c.createdAt,
          nombres: user?.nombres || user?.name || "", // Fallback para compatibilidad con distintos esquemas
          apellidos: user?.apellidos || "",
          img: user?.avatarUrl || "/img/usuarios/default.jpg", // Imagen de usuario con ruta relativa
          libro: {
            titulo: c.Book?.titulo || "",
            autor: c.Book?.autor || "",
            portada: c.Book?.portadaUrl || "/covers/default.jpg", // Imagen de portada con ruta relativa
          },
        }));

        setComments(mapped);
      })
      .catch((err) => {
        console.error("Error al cargar mis comentarios:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <MainLayout isLoggedIn={true} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Botón para volver al perfil del usuario */}
        <BackToProfileButton />

        {/* Título principal de la sección */}
        <h2 className="text-2xl font-bold">Mis comentarios</h2>

        {/* Renderizado condicional según estado de carga y existencia de comentarios */}
        {loading ? (
          <p className="text-gray-500">Cargando comentarios...</p>
        ) : comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="border rounded-lg p-4 bg-white shadow">
                <div className="flex gap-4">
                  {/* Imagen de portada del libro comentado */}
                  <img
                    src={c.libro.portada}
                    alt={c.libro.titulo}
                    className="w-16 h-20 object-cover rounded"
                  />

                  {/* Información del libro y componente de comentario */}
                  <div className="flex-1">
                    <p className="font-semibold">{c.libro.titulo}</p>
                    <p className="text-sm text-gray-500">{c.libro.autor}</p>

                    {/* Componente reutilizable que muestra el contenido del comentario */}
                    <CommentItem
                      comment={c}
                      currentUserId={user?.id}
                      onEdit={() => {}} // Placeholder para futura edición
                      onDelete={() => {}} // Placeholder para futura eliminación
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aún no has hecho comentarios.</p>
        )}
      </div>
    </MainLayout>
  );
}