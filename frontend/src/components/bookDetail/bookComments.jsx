import CommentItem from "./commentItem";
import CommentForm from "../comments/CommentForm";

export default function BookComments({ comments, onCreate }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comentarios</h3>

      <CommentForm onSubmit={onCreate} />

      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
    </div>
  );
}