import BookCard from "./bookCard";

export default function BookSection({ title, books }) {
  return (
    <section className="mb-8">
      {/* Título de la sección */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

      {/* Contenedor de libros */}
      <div className="flex gap-6 flex-wrap">
        {books.map((book, index) => (
          <BookCard
            key={index}
            id={book.id}
            cover={book.cover}
            title={book.title}
            category={book.category}
            author={book.author}
          />
        ))}
      </div>
    </section>
  );
}