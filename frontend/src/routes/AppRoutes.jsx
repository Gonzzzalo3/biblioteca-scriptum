import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Verify from "../pages/auth/Verify";
import ForgotPassword from "../pages/auth/forgotPassword";
import ForgotPasswordCode from "../pages/auth/forgotPasswordCode";
import ResetPassword from "../pages/auth/resetPassword";
import Home from "../pages/navBar/HomePage";
import BookDetailPage from "../pages/details/BookDetailPage";
import ReservationPage from "../pages/navBar/ReservationPage";
import HistoryPage from "../pages/navBar/historyPage";
import SuggestionsPage from "../pages/navBar/suggestionPage";
import UserProfilePage from "../pages/user/userProfilePage";
import MyCommentsPage from "../pages/user/MyCommentsPage";
import MySuggestionsPage from "../pages/user/MySuggestionPage";
import ProtectedRoute from "./ProtectedRoute";
import LogoutPage from "../pages/auth/logoutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/code" element={<ForgotPasswordCode />} />
      <Route path="/forgot-password/reset" element={<ResetPassword />} />
      <Route path="/logout" element={<LogoutPage />} />

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
    </Routes>
  );
}
