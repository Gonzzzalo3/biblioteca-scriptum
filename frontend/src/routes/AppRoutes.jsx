import { Routes, Route } from "react-router-dom";

// Páginas públicas de autenticación
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Verify from "../pages/auth/Verify";
import ForgotPassword from "../pages/auth/forgotPassword";
import ForgotPasswordCode from "../pages/auth/forgotPasswordCode";
import ResetPassword from "../pages/auth/resetPassword";
import LogoutPage from "../pages/auth/logoutPage";

// Páginas privadas de navegación general
import Home from "../pages/navBar/HomePage";
import BookDetailPage from "../pages/details/BookDetailPage";
import ReservationPage from "../pages/navBar/ReservationPage";
import HistoryPage from "../pages/navBar/historyPage";
import SuggestionsPage from "../pages/navBar/SuggestionPage";
import SearchPage from "../pages/navBar/searchPage";
import HelpPage from "../pages/navBar/HelpPage";

// Páginas privadas del usuario autenticado
import UserProfilePage from "../pages/user/userProfilePage";
import MyCommentsPage from "../pages/user/MyCommentsPage";
import MySuggestionsPage from "../pages/user/MySuggestionPage";
import PublicProfilePage from "../pages/user/PublicProfilePage";

// Páginas administrativas
import AdminSuggestionPage from "../pages/user/adminSuggestionPage";
import ReservationHistoryPage from "../pages/user/ReservationHistoryPage";
import AdminUserOverviewPage from "../pages/navBar/AdminUserOverviewPage";
import AdminActiveReservationsPage from "../pages/user/AdminActiveReservationsPage";

// Componente que protege rutas privadas mediante validación de sesión
import ProtectedRoute from "./ProtectedRoute";

// Componente que define todas las rutas de la aplicación
export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas de autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/code" element={<ForgotPasswordCode />} />
      <Route path="/forgot-password/reset" element={<ResetPassword />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* Rutas privadas protegidas por sesión */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservation"
        element={
          <ProtectedRoute>
            <ReservationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suggestion"
        element={
          <ProtectedRoute>
            <SuggestionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-comments"
        element={
          <ProtectedRoute>
            <MyCommentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-suggestions"
        element={
          <ProtectedRoute>
            <MySuggestionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <PublicProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <HelpPage />
          </ProtectedRoute>
        }
      />

      {/* Rutas administrativas protegidas */}
      <Route
        path="/admin/suggestions"
        element={
          <ProtectedRoute>
            <AdminSuggestionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reservations"
        element={
          <ProtectedRoute>
            <ReservationHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute>
            <AdminUserOverviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/active-reservations/:id"
        element={
          <ProtectedRoute>
            <AdminActiveReservationsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}