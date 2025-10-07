import { useUser } from "../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";

// Componente que protege rutas privadas.
// Redirige al login si el usuario no está autenticado.
// Redirige a verificación si el usuario aún no ha confirmado su cuenta.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser(); // Obtiene el estado de autenticación desde el contexto
  const location = useLocation(); // Captura la ubicación actual para redirección posterior

  // Mientras se carga el estado del usuario, no se renderiza nada
  if (loading) {
    return null;
  }

  // Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario no ha verificado su cuenta, redirige a la página de verificación
  if (!user.is_verified) {
    return <Navigate to="/verify" replace />;
  }

  // Si todo está correcto, renderiza el contenido protegido
  return children;
}