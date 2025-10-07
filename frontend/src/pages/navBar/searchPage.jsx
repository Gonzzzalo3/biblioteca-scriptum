import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import BooksContainer from "../../components/book/bookContainer";
import { searchBooks } from "../../services/book/book";

// Página que muestra los resultados de búsqueda de libros según el parámetro "q" en la URL
export default function SearchPage() {
  const [searchParams] = useSearchParams(); // Hook para acceder a los parámetros de búsqueda
  const query = searchParams.get("q") || ""; // Extrae el término de búsqueda

  const [sections, setSections] = useState([]); // Sección de resultados formateados
  const [loading, setLoading] = useState(true); // Estado de carga para mostrar feedback visual

  // Efecto que se ejecuta cada vez que cambia el término de búsqueda
  useEffect(() => {
    // Si el término está vacío o solo contiene espacios, se limpia la vista
    if (!query.trim()) {
      setSections([]);
      setLoading(false);
      return;
    }

    // Realiza la búsqueda de libros en el backend
    const fetchData = async () => {
      try {
        const res = await searchBooks(query);
        const books = Array.isArray(res.data?.libros) ? res.data.libros : [];

        // Formatea los resultados para el componente visual
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