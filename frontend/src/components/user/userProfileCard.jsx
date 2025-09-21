export default function UserProfileCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-6">
      {/* Imagen de perfil */}
      <img
        src={user.avatar || "/default-avatar.png"}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover shadow"
      />

      {/* Datos */}
      <div>
        <h2 className="text-2xl font-bold">{user.name} {user.lastName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500">Teléfono: {user.phone || "No registrado"}</p>
      </div>
    </div>
  );
}