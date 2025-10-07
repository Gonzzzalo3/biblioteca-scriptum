// src/components/auth/AuthLink.jsx

import { Link } from 'react-router-dom';

// Componente reutilizable para enlaces estilizados en vistas de autenticación
export default function AuthLink({ to, children }) {
  return (
    <Link to={to} className="text-green-600 hover:underline">
      {children}
    </Link>
  );
}