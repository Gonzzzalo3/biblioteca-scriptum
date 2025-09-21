export default function BookCard({ cover, title, category, author }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden w-48">
      {/* Portada */}
      <img
        src={cover}
        alt={title}
        className="w-full h-64 object-cover"
      />

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm truncate">{title}</h3>
        <p className="text-xs text-green-700 font-medium">{category}</p>
        <p className="text-xs text-gray-500">{author}</p>
      </div>
    </div>
  );
}