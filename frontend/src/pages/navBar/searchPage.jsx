import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import BooksContainer from "../../components/book/bookContainer";
import { searchBooks } from "../../services/book/book";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setSections([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await searchBooks(query);
        const books = Array.isArray(res.data?.libros) ? res.data.libros : [];

        const formattedBooks = books.map((book) => ({
          id: book.id,
          cover: book.portadaUrl || "/covers/default.jpg",
          title: book.titulo,
          category: book.Category?.nombre || "Sin categoría",
          author: book.autor || "Autor desconocido",
        }));

        setSections([
          {
            title: `Resultados de: "${query}"`,
            books: formattedBooks,
          },
        ]);
      } catch (err) {
        console.error("Error al buscar libros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <MainLayout>
      {loading ? (
        <p className="text-center text-gray-500">Buscando libros...</p>
      ) : sections.length > 0 && sections[0].books.length > 0 ? (
        <BooksContainer sections={sections} />
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron resultados para "{query}".
        </p>
      )}
    </MainLayout>
  );
}