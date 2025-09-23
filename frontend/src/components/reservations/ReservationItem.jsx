import { cancelReservation } from "../../services/reservation/reservation";

export default function ReservationItem({ book, onCancel }) {
  const handleCancel = async () => {
    const id = book.code?.replace("RES-", "");
    if (!id) return;

    const confirm = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (!confirm) return;

    try {
      await cancelReservation(id);
      alert("Reserva cancelada correctamente.");
      if (onCancel) onCancel(); // recarga desde el padre
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al cancelar la reserva.");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-24 h-32 object-cover rounded shadow"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-600">por {book.author}</p>
          <p className="text-xs text-gray-500">Código: {book.code}</p>
        </div>
      </div>

      <div className="text-right space-y-2">
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
          <p className="text-xs text-gray-500">Vence: {book.dueDate}</p>
        )}

        {book.status === "Reservado" && (
          <button
            onClick={handleCancel}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}