// src/middlewares/uploadUserImage.js

//Este middleware se encarga de manejar la subida de imágenes de perfil de los usuarios.
//Cuando un usuario actualiza su foto, la imagen se guarda en la carpeta pública del servidor.
//El archivo se renombra automáticamente usando el id del usuario para asegurar unicidad
//y evitar que se acumulen múltiples imágenes innecesarias para la misma cuenta.

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

//Se obtiene la ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuración del almacenamiento con multer
const storage = multer.diskStorage({
  //directorio donde se guardarán las imágenes de usuario
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/usuarios"));
  },
  //nombre con el que se guardará el archivo
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); //se obtiene la extensión original
    //se genera un nombre único basado en el id del usuario
    const filename = `user-${req.usuario.id}${ext}`;
    cb(null, filename);
  }
});

//Se exporta el middleware configurado
//Este se usará en las rutas donde los usuarios suban o actualicen su foto de perfil
export const uploadUserImage = multer({ storage });