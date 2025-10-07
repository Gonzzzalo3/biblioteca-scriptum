// src/components/ui/ReserveButton.jsx

// Componente que representa un botón de acción para reservar un libro
export default function ReserveButton({ onClick }) {
  return (
    <button
      onClick={onClick} // Acción que se ejecuta al hacer clic
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Reservar
    </button>
  );
}