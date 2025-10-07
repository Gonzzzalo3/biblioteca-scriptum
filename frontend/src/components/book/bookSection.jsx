// src/components/book/bookSection.jsx
import BookCard from "./bookCard";

// Componente que representa una sección temática de libros con su título y listado visual
export default function BookSection({ title, books }) {
  return (
    <section className="mb-8">
      {/* Encabezado de la sección */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

      {/* Contenedor de tarjetas de libros */}
      <div className="flex gap-6 flex-wrap">
        {books.map((book, index) => (
          <BookCard
            key={index} // Clave única para React
            id={book.id} // Identificador del libro para navegación
            cover={book.cover} // URL de la portada
            title={book.title} // Título del libro
            category={book.category} // Categoría asociada
            author={book.author} // Autor del libro
          />
        ))}
      </div>
    </section>
  );
}