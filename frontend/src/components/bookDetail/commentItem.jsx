import StarRating from "./StarRating";

export default function CommentItem({ comment }) {
  return (
    <li className="flex gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Imagen del usuario */}
      <img
        src={comment.userImage}
        alt={comment.userName}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Nombre y estrellas */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{comment.userName}</h4>
          <StarRating rating={comment.rating} />
        </div>

        {/* Texto del comentario */}
        <p className="text-gray-700 mt-2">{comment.text}</p>
      </div>
    </li>
  );
}