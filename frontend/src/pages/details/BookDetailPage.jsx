import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import BookDetail from "../../components/bookDetail/bookDetail";
import { getBookDetail } from "../../services/book/book";
import { getBookComments } from "../../services/comment/comment";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    Promise.all([getBookDetail(id), getBookComments(id)])
      .then(([bookRes, commentsRes]) => {
        const data = bookRes.data?.libro;
        const comentarios = commentsRes.data?.comentarios || [];

        if (data) {
          setBook({
            id: data.id,
            cover: data.portada || "/covers/default.jpg",
            title: data.titulo,
            author: data.autor,
            category: data.Category?.nombre || "Sin categoría",
            synopsis: data.sinopsis,
            stock: data.stock,
            comments: comentarios.map(c => ({
              id: c.id,
              contenido: c.contenido,
              calificacion: c.calificacion,
              fecha: c.createdAt,
              nombres: c.User?.nombres || "",
              apellidos: c.User?.apellidos || "",
              img: c.User?.img || "/img/usuarios/default.jpg"
            }))
          });
        }
      })
      .catch((err) => {
        console.error("Error al cargar detalle o comentarios:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <MainLayout>
      {loading ? (
        <p className="text-center text-gray-500">Cargando detalle del libro...</p>
      ) : book ? (
        <BookDetail book={book} />
      ) : (
        <p className="text-center text-red-500">Libro no encontrado.</p>
      )}
    </MainLayout>
  );
}