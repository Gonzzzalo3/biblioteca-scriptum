export default function UserHeader({ img, nombres, apellidos, onImageSelect }) {
  return (
    <div className="flex justify-center">
      <label className="cursor-pointer relative group">
        <img
          src={img}
          alt={`${nombres} ${apellidos}`}
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-80 transition"
        />
        <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition">
          Cambiar foto
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              onImageSelect(file);
            }
          }}
        />
      </label>
    </div>
  );
}