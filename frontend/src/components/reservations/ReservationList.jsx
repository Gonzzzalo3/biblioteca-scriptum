// src/components/reservations/ReservationList.jsx
import ReservationItem from "./ReservationItem";

// Componente que agrupa y muestra una lista de reservas, con acciones según el modo
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
      {/* Título de la sección */}
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Contenedor de ítems o mensaje vacío */}
      <div className="space-y-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <ReservationItem
              key={index} // Clave única para React
              book={book} // Datos del libro/reserva
              modo={modo} // Define el rol: cliente o bibliotecario
              onCancel={onCancel} // Callback para cancelar
              onConfirm={onConfirm} // Callback para confirmar préstamo
              onReturn={onReturn} // Callback para confirmar devolución
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay libros en esta sección.</p>
        )}
      </div>
    </section>
  );
}