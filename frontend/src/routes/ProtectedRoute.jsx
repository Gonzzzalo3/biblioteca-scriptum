// src/routes/ProtectedRoute.jsx
import { useUser } from "../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return null; // o un spinner de carga
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.is_verified) {
    return <Navigate to="/verify" replace />;
  }

  return children;
}