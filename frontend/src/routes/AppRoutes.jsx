// src/routes/AppRoutes.jsx

import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Verify from '../pages/auth/Verify';
import ForgotPassword from '../pages/auth/forgotPassword';
import ForgotPasswordCode from '../pages/auth/forgotPasswordCode';
import ResetPassword from '../pages/auth/resetPassword';
import Home from '../pages/navBar/HomePage';
import BookDetailPage from '../pages/details/BookDetailPage';
import ReservationPage from '../pages/navBar/ReservationPage';
import HistoryPage from '../pages/navBar/historyPage';
import SuggestionsPage from '../pages/navBar/suggestionPage';
import UserProfilePage from '../pages/user/userProfilePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/code" element={<ForgotPasswordCode />} />
      <Route path="/forgot-password/reset" element={<ResetPassword />} />

      <Route path="/" element={<Home />} />
      <Route path="/books/:id"element={<BookDetailPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/suggestion" element={<SuggestionsPage />} />

      <Route path="/my-profile" element={<UserProfilePage />} />
      {/* otras rutas */}
    </Routes>
  );
}