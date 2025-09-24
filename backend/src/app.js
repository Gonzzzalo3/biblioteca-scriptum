import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import { config } from "./config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/img/libros", express.static(path.join(__dirname, "../public/img/libros")));
app.use("/img/usuarios", express.static(path.join(__dirname, "../public/img/usuarios")));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error("Error no capturado:", err);
  res.status(500).json({ mensaje: "Error interno del servidor." });
});

export default app;