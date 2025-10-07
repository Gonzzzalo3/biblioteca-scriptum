// src/components/bookDetail/bookDetail.jsx
import { useState } from "react";
import BookInfo from "./bookInfo";
import BookComments from "./bookComments";
import ReserveModal from "../ui/ReserveModal";
import ReserveButton from "../ui/ReserveButton";
import { ROLES } from "../../utils/constants";

// Componente principal que muestra el detalle de un libro, incluyendo información, comentarios y opción de reserva
export default function BookDetail({
  book,               // Objeto con datos del libro
  currentUserId,      // ID del usuario actual (para comentarios)
  currentUserRole,    // Rol del usuario (para mostrar botón de reserva)
  onCreateComment,    // Función para crear comentario
  onEditComment,      // Función para editar comentario
  onDeleteComment,    // Función para eliminar comentario
  onReserve           // Función para crear reserva
}) {
  // Estado para controlar la visibilidad del modal de reserva
  const [showModal, setShowModal] = useState(false);

  // Lógica para confirmar la reserva de un ejemplar
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
      {/* Información del libro y botón de reserva si aplica */}
      <BookInfo
        book={book}
        showReserveButton={
          currentUserRole === ROLES.CLIENTE && book.firstEjemplarId
        }
        onReserve={() => setShowModal(true)}
      />

      <hr className="border-gray-300" />

      {/* Sección de comentarios */}
      <BookComments
        comments={book.comments}
        currentUserId={currentUserId}
        onCreate={onCreateComment}
        onEdit={onEditComment}
        onDelete={onDeleteComment}
      />

      {/* Modal de confirmación de reserva */}
      {showModal && (
        <ReserveModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmReserve}
        />
      )}
    </div>
  );
}