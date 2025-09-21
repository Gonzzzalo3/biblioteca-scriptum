export default function BookInfo({ book }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 mb-4">por {book.author}</p>

      <div className="flex gap-6">
        {/* Portada */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-48 h-64 object-cover rounded shadow"
        />

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Sinopsis</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {book.synopsis}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Categoría:</span> {book.category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Stock:</span> {book.stock}
          </p>
        </div>
      </div>
    </>
  );
}