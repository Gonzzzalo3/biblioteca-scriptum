// src/middlewares/uploadBookCover.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/libros"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `cover-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, filename);
  }
});

export const uploadBookCover = multer({ storage });