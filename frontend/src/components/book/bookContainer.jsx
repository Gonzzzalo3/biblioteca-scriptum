// src/components/book/bookContainer.jsx
import BookSection from "./bookSection";

// Componente contenedor que organiza múltiples secciones de libros
export default function BooksContainer({ sections }) {
  return (
    <div className="space-y-10">
      {/* Itera sobre cada sección y renderiza su bloque correspondiente */}
      {sections.map((section, index) => (
        <BookSection
          key={index} // Clave única para React
          title={section.title} // Título de la sección
          books={section.books} // Lista de libros asociada
        />
      ))}
    </div>
  );
}