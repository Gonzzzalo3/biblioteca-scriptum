// Componente que representa el encabezado visual del perfil de usuario con opción de cambiar imagen
export default function UserHeader({ img, nombres, apellidos, onImageSelect }) {
  return (
    <div className="flex justify-center">
      <label className="cursor-pointer relative group">
        {/* Imagen de perfil del usuario */}
        <img
          src={img} // URL de la imagen actual del usuario
          alt={`${nombres} ${apellidos}`} // Texto alternativo accesible
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-80 transition"
        />

        {/* Superposición visible al pasar el cursor */}
        <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition">
          Cambiar foto
        </span>

        {/* Campo oculto para seleccionar nueva imagen */}
        <input
          type="file"
          accept="image/*" // Solo permite archivos de imagen
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0]; // Obtiene el archivo seleccionado
            if (file) {
              onImageSelect(file); // Ejecuta la función de selección de imagen
            }
          }}
        />
      </label>
    </div>
  );
}