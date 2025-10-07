// src/components/bookDetail/bookComments.jsx
import CommentForm from "../comments/CommentForm";
import CommentItem from "./commentItem";

// Componente que gestiona la sección de comentarios asociados a un libro
export default function BookComments({
  comments,         // Lista de comentarios existentes
  currentUserId,    // ID del usuario actual (para permisos de edición/eliminación)
  onCreate,         // Función para crear un nuevo comentario
  onEdit,           // Función para editar un comentario existente
  onDelete          // Función para eliminar un comentario
}) {
  return (
    <div>
      {/* Encabezado de la sección */}
      <h3 className="text-lg font-semibold mb-4">Comentarios</h3>

      {/* Formulario para agregar nuevo comentario */}
      <CommentForm onSubmit={onCreate} />

      {/* Lista de comentarios existentes o mensaje vacío */}
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              currentUserId={currentUserId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
    </div>
  );
}