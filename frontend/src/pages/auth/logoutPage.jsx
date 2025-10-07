// src/pages/auth/logoutPage.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { logoutRequest } from "../../services";

// Página que ejecuta el proceso de cierre de sesión del usuario
export default function LogoutPage() {
  const { logout } = useUser(); // Función de limpieza del contexto
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    // Función que realiza el logout en backend y frontend
    const doLogout = async () => {
      try {
        await logoutRequest(); // Intenta cerrar sesión en el servidor
      } catch (err) {
        console.error(err); // Registra errores si ocurren
      } finally {
        logout(); // Limpia el estado local y almacenamiento
        navigate("/login"); // Redirige al login
      }
    };

    doLogout(); // Ejecuta al montar el componente
  }, []);

  // Mensaje visual mientras se procesa el cierre
  return <p className="p-4">Cerrando sesión...</p>;
}