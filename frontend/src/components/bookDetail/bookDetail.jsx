import { useState } from "react";
import BookInfo from "./bookInfo";
import BookComments from "./bookComments";
import ReserveButton from "../ui/ReserveButton";
import ReserveModal from "../ui/ReserveModal";

export default function BookDetail({ book }) {
  const [showModal, setShowModal] = useState(false);

  const handleReserve = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    alert("Reserva confirmada. Recuerde recoger su libro en 3 días.");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <BookInfo book={book} />

      <hr className="my-6 border-gray-300" />

      <BookComments comments={book.comments} />

      {showModal && (
        <ReserveModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}