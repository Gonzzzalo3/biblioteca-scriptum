import { FaPen } from "react-icons/fa";

export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition"
      title="Quick Admin"
    >
      <FaPen size={20} />
    </button>
  );
}