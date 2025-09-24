// src/routes/userRoutes.js

import express from "express";
import { viewProfileController } from "../controllers/User/viewProfile.controller.js";
import { editProfileController } from "../controllers/User/editProfile.controller.js";
import { viewPublicProfileController } from "../controllers/User/viewPublicProfile.controller.js";
import { changePasswordController } from "../controllers/User/changePassword.controller.js";
import { listUsersController } from "../controllers/User/listUsers.controller.js";
import { updateUserStatusController } from "../controllers/User/updateUserStatus.controller.js";
import { deleteProfileController } from "../controllers/User/deleteProfile.controller.js";
import { verificarToken } from "../middlewares/auth.js";
import { authorizeRole } from "../middlewares/authRole.js";
import { validateUserStatus } from "../middlewares/validateUserStatus.js";
import { ROLES } from "../config/constants.js";
import { validateVerificationStatus } from "../middlewares/validateVerificationStatus.js";
import { uploadUserImage } from "../middlewares/uploadUserImage.js";
import { getAllUsersWithStatusController } from "../controllers/User/getAllUsersWithStatus.controller.js";

const router = express.Router();

/* ────────────────────────────────
   Perfil público (sin token)
   ──────────────────────────────── */

// Ver perfil público de cualquier usuario
router.get(
  "/profile/:id",
  validateUserStatus,
  validateVerificationStatus,
  viewPublicProfileController
);

/* ────────────────────────────────
   Perfil privado (usuario autenticado)
   ──────────────────────────────── */

// Ver perfil propio
router.get(
  "/profile",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  viewProfileController
);

// Editar perfil propio (con imagen opcional)
router.put(
  "/profile",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  uploadUserImage.single("img"),
  editProfileController
);

// Cambiar contraseña
router.put(
  "/change-password",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  changePasswordController
);

// Desactivar cuenta propia
router.delete(
  "/profile",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  deleteProfileController
);

/* ────────────────────────────────
   Gestión de usuarios (solo bibliotecarios)
   ──────────────────────────────── */

// Listar todos los clientes registrados
router.get(
  "/clients",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  listUsersController
);

// Bloquear o desbloquear usuario
router.put(
  "/update-status/:id",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  updateUserStatusController
);

// Ver estado general de todos los usuarios
router.get(
  "/usuarios/status",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  getAllUsersWithStatusController
);

export default router;