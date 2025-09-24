import ReservationItem from "./ReservationItem";

export default function ReservationList({
  title,
  books,
  modo = "cliente",
  onCancel,
  onConfirm,
  onReturn,
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <ReservationItem
              key={index}
              book={book}
              modo={modo}
              onCancel={onCancel}
              onConfirm={onConfirm}
              onReturn={onReturn}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay libros en esta sección.</p>
        )}
      </div>
    </section>
  );
}