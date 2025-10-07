// src/components/admin/UserList.jsx
import UserCard from "./UserCard";

// Componente que representa una lista de usuarios en formato de tarjetas
export default function UserList({ users }) {
  return (
    <div className="grid gap-4">
      {/* Itera sobre el arreglo de usuarios y renderiza una tarjeta por cada uno */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}