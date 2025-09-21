export default function ReserveButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Reservar
    </button>
  );
}