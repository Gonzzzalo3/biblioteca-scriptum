import { useState } from "react";
import BookInfo from "./bookInfo";
import BookComments from "./bookComments";
import ReserveModal from "../ui/ReserveModal";
import ReserveButton from "../ui/ReserveButton";
import { ROLES } from "../../utils/constants";

export default function BookDetail({
  book,
  currentUserId,
  currentUserRole,
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
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <BookInfo
        book={book}
        showReserveButton={
          currentUserRole === ROLES.CLIENTE && book.firstEjemplarId
        }
        onReserve={() => setShowModal(true)}
      />

      <hr className="border-gray-300" />

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