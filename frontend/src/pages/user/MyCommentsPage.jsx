import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import CommentItem from "../../components/bookDetail/commentItem";
import BackToProfileButton from "../../components/ui/BackToProfileButton";
import { getOwnComments } from "../../services/comment/comment";
import { useUser } from "../../context/UserContext";

export default function MyCommentsPage() {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwnComments()
      .then((res) => {
        const data = res.data?.comentarios || [];
        const mapped = data.map((c) => ({
          id: c.id,
          id_usuario: c.id_usuario,
          contenido: c.contenido,
          calificacion: c.calificacion,
          fecha: c.createdAt,
          nombres: user?.nombres || user?.name || "",
          apellidos: user?.apellidos || "",
          img: user?.avatarUrl || "/img/usuarios/default.jpg",
          libro: {
            titulo: c.Book?.titulo || "",
            autor: c.Book?.autor || "",
            portada: c.Book?.portadaUrl || "/covers/default.jpg"
          }
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
        <BackToProfileButton />
        <h2 className="text-2xl font-bold">Mis comentarios</h2>

        {loading ? (
          <p className="text-gray-500">Cargando comentarios...</p>
        ) : comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="border rounded-lg p-4 bg-white shadow">
                <div className="flex gap-4">
                  <img
                    src={c.libro.portada}
                    alt={c.libro.titulo}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{c.libro.titulo}</p>
                    <p className="text-sm text-gray-500">{c.libro.autor}</p>
                    <CommentItem
                      comment={c}
                      currentUserId={user?.id}
                      onEdit={() => {}}
                      onDelete={() => {}}
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