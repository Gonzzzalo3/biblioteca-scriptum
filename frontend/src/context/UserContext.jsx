import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

function formatUser(rawUser) {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const timestamp = Date.now();
  return {
    ...rawUser,
    avatarUrl: rawUser.img
      ? `${baseUrl}${rawUser.img}?t=${timestamp}`
      : `${baseUrl}/img/usuarios/default.jpg?t=${timestamp}`,
  };
}

export function UserProvider({ children }) {
  const [user, setUserRaw] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserRaw(formatUser(parsed));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const setUser = (rawUser) => {
    const formatted = formatUser(rawUser);
    setUserRaw(formatted);
    localStorage.setItem("user", JSON.stringify(formatted));
  };

  const markUserAsVerified = () => {
    if (user) {
      const updatedUser = formatUser({ ...user, is_verified: true });
      setUserRaw(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUserRaw(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

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

export function useUser() {
  return useContext(UserContext);
}
