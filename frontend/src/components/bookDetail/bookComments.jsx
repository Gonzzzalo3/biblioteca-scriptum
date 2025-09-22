import CommentForm from "../comments/CommentForm";
import CommentItem from "./commentItem";

export default function BookComments({
  comments,
  currentUserId,
  onCreate,
  onEdit,
  onDelete
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comentarios</h3>

      <CommentForm onSubmit={onCreate} />

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