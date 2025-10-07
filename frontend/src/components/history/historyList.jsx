// src/components/history/historyList.jsx
import HistoryItem from "./historyItem";

// Componente que agrupa y muestra una lista de elementos históricos (préstamos, devoluciones, etc.)
export default function HistoryList({ title, books }) {
  return (
    <section className="mb-8">
      {/* Título de la sección */}
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Contenedor de ítems o mensaje vacío */}
      <div className="space-y-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <HistoryItem key={index} book={book} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay registros en esta sección.</p>
        )}
      </div>
    </section>
  );
}