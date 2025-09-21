// src/pages/auth/logoutPage.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { logoutRequest } from "../../services";

export default function LogoutPage() {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logoutRequest();
      } catch (err) {
        console.error(err);
      } finally {
        logout();
        navigate("/login");
      }
    };
    doLogout();
  }, []);

  return <p className="p-4">Cerrando sesión...</p>;
}