import MainLayout from "../../layouts/MainLayout";
import BooksContainer from "../../components/book/bookContainer";

export default function Home() {
  const isLoggedIn = true;
  const user = { name: "Gonzalo Cáceres", email: "gonzalo@example.com" };

  // Generar muchos libros de ejemplo
  const manyBooks = Array.from({ length: 20 }, (_, i) => ({
    cover: `/covers/libro${(i % 5) + 1}.jpg`,
    title: `Libro ${i + 1}`,
    category: "Categoría",
    author: "Autor Desconocido",
  }));

  const sections = [
    {
      title: "Lo más popular",
      books: manyBooks,
    },
    {
      title: "Recomendaciones",
      books: manyBooks,
    },
  ];

  return (
    <MainLayout isLoggedIn={isLoggedIn} user={user}>
      <BooksContainer sections={sections} />
    </MainLayout>
  );
}