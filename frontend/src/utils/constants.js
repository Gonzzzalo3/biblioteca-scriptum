// Tipos de sugerencia disponibles en el sistema
export const SUGGESTION_TYPES = {
  LIBRO_RECOMENDADO: "libro_recomendado",         // Recomendación de material bibliográfico
  ERROR_EN_CONTENIDO: "error_en_contenido",       // Corrección de errores en contenidos existentes
  MEJORA_VISUAL: "mejora_visual",                 // Propuesta de mejoras estéticas o de diseño
  FUNCIONALIDAD_NUEVA: "funcionalidad_nueva",     // Sugerencia de nuevas funcionalidades
  EXPERIENCIA_USUARIO: "experiencia_usuario",     // Observaciones sobre la usabilidad o navegación
  GESTION_BIBLIOTECA: "gestion_biblioteca",       // Propuestas relacionadas con procesos internos
};

// Roles de usuario definidos en el sistema
export const ROLES = {
  BIBLIOTECARIO: "bibliotecario", // Usuario con permisos administrativos
  CLIENTE: "cliente"              // Usuario final del sistema
};

// Estados posibles para un usuario
export const USER_STATUS = {
  ACTIVO: "activo",         // Usuario con acceso habilitado
  INACTIVO: "inactivo",     // Usuario deshabilitado temporalmente
  SUSPENDIDO: "suspendido", // Usuario con acceso restringido por sanción u otra razón
};