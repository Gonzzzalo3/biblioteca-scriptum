import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import BooksContainer from "../../components/book/bookContainer";
import { getPopularBooks } from "../../services/book/book";

export default function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularBooks()
      .then((res) => {
        const books = Array.isArray(res.data?.libros) ? res.data.libros : [];

        const formattedBooks = books.map((book) => ({
          id: book.id,
          cover: book.portadaUrl || "/covers/default.jpg", // ajusta según tu modelo
          title: book.titulo,
          category: book.categoria?.nombre || "Sin categoría",
          author: book.autor || "Autor desconocido",
        }));

        setSections([
          { title: "Lo más popular", books: formattedBooks },
        ]);
      })
      .catch((err) => {
        console.error("Error al cargar libros populares:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <p className="text-center text-gray-500">Cargando libros populares...</p>
      ) : (
        <BooksContainer sections={sections} />
      )}
    </MainLayout>
  );
}