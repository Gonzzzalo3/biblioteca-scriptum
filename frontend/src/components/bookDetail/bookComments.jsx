import CommentItem from "./commentItem";

export default function BookComments({ comments }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comentarios</h3>
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((c, i) => (
            <CommentItem key={i} comment={c} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
    </div>
  );
}