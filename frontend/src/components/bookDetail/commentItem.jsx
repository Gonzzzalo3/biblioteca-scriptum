import StarRating from "./StarRating";

export default function CommentItem({ comment }) {
  return (
    <li className="flex gap-4 bg-gray-50 p-4 rounded-lg">
      <img
        src={comment.img}
        alt={`${comment.nombres} ${comment.apellidos}`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            {comment.nombres} {comment.apellidos}
          </p>
          <StarRating rating={comment.calificacion} />
        </div>
        <p className="text-sm text-gray-500">
          {new Date(comment.fecha).toLocaleDateString()}
        </p>
        <p className="mt-1">{comment.contenido}</p>
      </div>
    </li>
  );
}