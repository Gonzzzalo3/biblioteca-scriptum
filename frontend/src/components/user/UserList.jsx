// src/components/admin/UserList.jsx
import UserCard from "./UserCard";

export default function UserList({ users }) {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}