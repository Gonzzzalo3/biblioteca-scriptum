// src/middlewares/uploadBookCover.js

//Este middleware se encarga de manejar la subida de portadas de libros.
//Cuando un bibliotecario sube una imagen, se valida y se guarda en la carpeta pública del servidor.
//El archivo se renombra automáticamente para evitar conflictos y mantener un formato uniforme.

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

//Se obtiene la ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuración del almacenamiento con multer
const storage = multer.diskStorage({
  //directorio donde se guardarán las portadas
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/libros"));
  },
  //nombre con el que se guardará el archivo
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); //se obtiene la extensión original
    //se genera un nombre único con timestamp y número aleatorio
    const filename = `cover-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, filename);
  }
});

//Se exporta el middleware configurado
//Este se usará en las rutas donde se suban portadas de libros
export const uploadBookCover = multer({ storage });