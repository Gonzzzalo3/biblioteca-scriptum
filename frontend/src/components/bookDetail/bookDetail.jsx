import { useState } from "react";
import BookInfo from "./bookInfo";
import BookComments from "./bookComments";
import ReserveModal from "../ui/ReserveModal";

export default function BookDetail({
  book,
  currentUserId,
  onCreateComment,
  onEditComment,
  onDeleteComment,
  onReserve
}) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmReserve = () => {
    if (!book.firstEjemplarId) {
      alert("No se encontró un ejemplar disponible para reservar.");
      return;
    }
    onReserve(book.firstEjemplarId)
      .then(() => {
        alert("Reserva creada correctamente.");
        setShowModal(false);
      })
      .catch((err) => {
        alert(err.response?.data?.mensaje || "Error al crear la reserva.");
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <BookInfo book={book} onReserve={() => setShowModal(true)} />

      <hr className="my-6 border-gray-300" />

      <BookComments
        comments={book.comments}
        currentUserId={currentUserId}
        onCreate={onCreateComment}
        onEdit={onEditComment}
        onDelete={onDeleteComment}
      />

      {showModal && (
        <ReserveModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmReserve}
        />
      )}
    </div>
  );
}