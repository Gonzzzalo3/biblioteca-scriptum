// Componente que representa el encabezado público del perfil de un usuario
export default function PublicUserHeader({ img, nombres, apellidos, rol, createdAt }) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between text-white gap-6">
      {/* Sección izquierda: imagen de perfil y datos principales */}
      <div className="flex items-center gap-6">
        <img
          src={img} // URL de la imagen de perfil
          alt={`${nombres} ${apellidos}`} // Texto alternativo accesible
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{nombres} {apellidos}</h1> {/* Nombre completo */}
          <p className="text-sm opacity-90">Rol: {rol}</p> {/* Rol del usuario */}
        </div>
      </div>

      {/* Sección derecha: fecha de creación de la cuenta */}
      <div className="text-sm md:text-right">
        <p>
          <span className="font-semibold">Miembro desde:</span> {createdAt}
        </p>
      </div>
    </div>
  );
}