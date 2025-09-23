import { useState } from "react";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function CommentItem({ comment, currentUserId, onEdit, onDelete }) {
  const isOwner = Number(comment.id_usuario) === Number(currentUserId);
  const [isEditing, setIsEditing] = useState(false);
  const [contenido, setContenido] = useState(comment.contenido);
  const [calificacion, setCalificacion] = useState(comment.calificacion);

  const handleDelete = () => {
    if (window.confirm("¿Seguro que quieres eliminar este comentario?")) {
      onDelete(comment.id);
    }
  };

  const handleSave = () => {
    if (!contenido.trim() || calificacion === 0) return;
    onEdit(comment.id, { contenido, calificacion });
    setIsEditing(false);
  };

  return (
    <li className="flex gap-4 bg-gray-50 p-4 rounded-lg">
      <img
        src={comment.img}
        alt={`${comment.nombres} ${comment.apellidos}`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${comment.id_usuario}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {comment.nombres} {comment.apellidos}
          </Link>
          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700"
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Editar"
                >
                  <FaEdit />
                </button>
              </>
            )}
            {!isEditing && <StarRating rating={comment.calificacion} />}
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(comment.fecha).toLocaleDateString()}
        </p>

        {isEditing ? (
          <div className="mt-2 space-y-2">
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full border rounded p-2"
              rows={3}
            />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setCalificacion(star)}
                  className={`cursor-pointer ${
                    star <= calificacion ? "text-yellow-400" : "text-gray-300"
                  }`}
                  size={20}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setContenido(comment.contenido);
                  setCalificacion(comment.calificacion);
                }}
                className="bg-gray-400 text-white rounded px-3 py-1 hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1">{comment.contenido}</p>
        )}
      </div>
    </li>
  );
}