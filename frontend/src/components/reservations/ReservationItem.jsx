export default function ReservationItem({ book }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Imagen del libro */}
      <div className="flex items-center gap-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-24 h-32 object-cover rounded shadow" // antes w-16 h-20
        />
        <div>
          <h3 className="font-semibold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-600">por {book.author}</p>
          <p className="text-xs text-gray-500">Código: {book.code}</p>
        </div>
      </div>

      {/* Estado y fechas */}
      <div className="text-right">
        <p
          className={`text-sm font-medium ${
            book.status === "Vencido"
              ? "text-red-600"
              : book.status === "En posesión"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {book.status}
        </p>
        {book.dueDate && (
          <p className="text-xs text-gray-500">
            Vence: {book.dueDate}
          </p>
        )}
      </div>
    </div>
  );
}