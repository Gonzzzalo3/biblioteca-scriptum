import { createContext, useContext, useState, useEffect } from "react";

// Contexto global para gestionar el estado del usuario autenticado
const UserContext = createContext();

// Función que formatea el objeto de usuario, incluyendo la URL del avatar
function formatUser(rawUser) {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; // Uso directo de VITE_BASE_URL
  const timestamp = Date.now(); // Evita caché en imágenes
  return {
    ...rawUser,
    avatarUrl: rawUser.img
      ? `${baseUrl}${rawUser.img}?t=${timestamp}` // Imagen personalizada
      : `${baseUrl}/img/usuarios/default.jpg?t=${timestamp}`, // Imagen por defecto
  };
}

// Proveedor del contexto de usuario, encapsula lógica de sesión y persistencia
export function UserProvider({ children }) {
  const [user, setUserRaw] = useState(null); // Estado del usuario autenticado
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null // Token persistido
  );
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  // Carga inicial del usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserRaw(formatUser(parsed));
    }
    setLoading(false);
  }, []);

  // Persistencia del usuario en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Persistencia del token en localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  // Setter externo para actualizar el usuario
  const setUser = (rawUser) => {
    const formatted = formatUser(rawUser);
    setUserRaw(formatted);
    localStorage.setItem("user", JSON.stringify(formatted));
  };

  // Marca al usuario como verificado
  const markUserAsVerified = () => {
    if (user) {
      const updatedUser = formatUser({ ...user, is_verified: true });
      setUserRaw(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Cierra sesión y limpia datos persistidos
  const logout = () => {
    setUserRaw(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  // Proporciona el contexto a los componentes hijos
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        logout,
        markUserAsVerified,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para consumir el contexto de usuario
export function useUser() {
  return useContext(UserContext);
}