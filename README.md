Este es un sistema que simula el funcionamiento de una biblioteca municipal, por lo que no incluye sistema de pagos. Sin embargo si se puede reservar libros, realizar comentarios, crear usuarios y más funcionalidades que se explicarán más abajo. El programa está hecho para que con solo ejecutar el backend se cree automáticamente la base de datos y sea poblado, sin embargo si hay que configurar y tener instalado algunas cosas previamente.

Aquí los pasos a seguir antes de hacer funcionar el sistema:

1. Node.js (recomendado 22.14.0 o 20.19.5, no he probado otras versiones así que no sé si pueden haber incompatibilidades)
Link de descarga: https://nodejs.org/es

2. Instalar MySQL (de preferencia la versión full para que incluya el Server, Workbench, Shell, etc)
Link de descarga: https://dev.mysql.com/downloads/installer/

3. Dentro de la carpeta general, en consola navega hacia la carpeta backend con el comando "cd backend" e instala todos los módulos con "npm install"
En caso de que te impida ejecutar scripts, abre powerShell y coloca "Set-ExecutionPolicy RemoteSigned" y dale que si.

4. Luego de que se instalen las dependencias debes entrar al archivo ".env.example" y cambiar las variables en base a tu configuración, de preferencia solo quitarlos como comentario y ponerlos igual que como están, lo único que podría cambiar es la base de datos en MySQL, ahí deberás cambiar "DB_USER" si estás usando otro usuario (sino usa root), "DB_PASS" por la contraseña que tu definiste y "DB_PORT" dependiendo del puerto donde esté MySQL (por defecto 3306).

NodeMailer dejarlo como está, pero si debes realizar unos cambios, configura los valores de "MAIL_USER" y "MAIL_PASS" por los siguientes:
MAIL_USER=scriptum26@gmail.com
MAIL_PASS=iekh wsok shwa fmkl

Una vez  todo esté configurado puedes poner "npm start" para iniciar el proyecto, si esto no funciona también puedes poner "node src/server.js", si sale que el servidor está escuchando entonces ya estaría todo listo.

5. De igual manera, ahora entraremos a la carpeta "frontend" y le pondremos "npm install", si todo ha ido bien en el archivo ".env.example" debemos configurar las variables de entorno, si no cambiaste nada en el backend salvo lo que te dije, puedes dejar tal cual solo borrando los comentarios, luego renómbralo a ".env".

6. Una vez tengas las dependencias instaladas, y el .env configurado debes correr el frontend con el comando "npm run dev", si todo está bien debe abrirse el localhost en el puerto 5173.

Una vez hagas todos estos pasos deberías entrar al link que te sale en el frontend, y ya estarás en la página, aquí puedes crear una cuenta o usar una que ya está creada predeterminadamente. Existen 2 roles (bibliotecario y cliente), dependiendo del rol tendrás más o menos permisos, aquí abajo te dejaré las cuentas creadas predeterminadamente para que puedas probarlas:

Cuenta de bibliotecario
Correo: ana.biblio@demo.com
Contraseña: admin123

Cuentas de clientes:
Cliente 1:
correo: ariel.astete@demo.com
contraseña: cliente123

Cliente 2:
correo: maria.cliente@demo.com
contraseña: cliente123

Cliente 3:
correo: diego.veliz@demo.com
contraseña: cliente123


