import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import BookDetail from "../../components/bookDetail/bookDetail";
import { getBookDetail } from "../../services/book/book";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // mejora UX al navegar

    getBookDetail(id)
      .then((res) => {
        const data = res.data?.libro;
        if (data) {
          setBook({
            id: data.id,
            cover: data.portadaUrl || "/covers/default.jpg",
            title: data.titulo,
            author: data.autor,
            category: data.Category?.nombre || "Sin categoría",
            synopsis: data.sinopsis,
            stock: data.stock,
            comments: data.comentarios || [],
          });
        }
      })
      .catch((err) => {
        console.error("Error al cargar detalle del libro:", err);
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