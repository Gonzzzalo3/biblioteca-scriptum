export default function UserHeader({ img, nombres, apellidos, correo, celular, rol, estado, createdAt }) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between text-white gap-6">
      <div className="flex items-center gap-6">
        <img
          src={img}
          alt={`${nombres} ${apellidos}`}
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{nombres} {apellidos}</h1>
          <p className="text-sm opacity-90">{correo}</p>
          <p className="text-sm opacity-90">Teléfono: {celular || "No registrado"}</p>
        </div>
      </div>
      <div className="text-sm md:text-right">
        <p><span className="font-semibold">Rol:</span> {rol}</p>
        <p><span className="font-semibold">Estado:</span> {estado}</p>
        <p><span className="font-semibold">Creado:</span> {createdAt}</p>
      </div>
    </div>
  );
}