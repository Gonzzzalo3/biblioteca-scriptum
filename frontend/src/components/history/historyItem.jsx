import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

export default function HistoryItem({ book }) {
  const today = new Date();
  const dueDate = book.dueDate ? new Date(book.dueDate) : null;

  let displayStatus = book.action;
  let statusColor = "text-gray-600";
  let StatusIcon = FaClock;

  if (book.rawAction === "devuelto") {
    statusColor = "text-green-600";
    StatusIcon = FaCheckCircle;
  } else if (book.rawAction === "prestado") {
    if (dueDate && today > dueDate) {
      displayStatus = "Vencido";
      statusColor = "text-red-600";
      StatusIcon = FaTimesCircle;
    } else {
      displayStatus = "En posesión";
      statusColor = "text-blue-600";
      StatusIcon = FaClock;
    }
  } else if (book.rawAction === "creado") {
    statusColor = "text-yellow-600";
    StatusIcon = FaClock;
  } else if (book.rawAction === "cancelar") {
    statusColor = "text-red-600";
    StatusIcon = FaTimesCircle;
  }

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

      <div className="text-right">
        <div className={`flex items-center gap-1 justify-end ${statusColor}`}>
          <StatusIcon />
          <span className="font-medium">{displayStatus}</span>
        </div>
        {book.date && (
          <p className="text-xs text-gray-500">Fecha: {book.date}</p>
        )}
      </div>
    </div>
  );
}
