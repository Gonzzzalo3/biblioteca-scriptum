// src/app.js

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import { config } from "./config/env.js";

// Resolución de rutas absolutas para entorno ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de CORS para permitir solicitudes desde el frontend autorizado
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

// Middleware para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Servir archivos estáticos desde el directorio público
app.use("/img/libros", express.static(path.join(__dirname, "../public/img/libros")));
app.use("/img/usuarios", express.static(path.join(__dirname, "../public/img/usuarios")));
app.use(express.static(path.join(__dirname, "../public")));

// Registro de rutas bajo el prefijo /api
app.use("/api", routes);

// Middleware global para manejo de errores no capturados
app.use((err, req, res, next) => {
  console.error("Error no capturado:", err);
  res.status(500).json({ mensaje: "Error interno del servidor." });
});

export default app;