// utils/formatDate.js

/**
 * Formatea una cadena ISO de fecha en formato legible para Perú.
 * Si la cadena es inválida o no está presente, retorna un mensaje por defecto.
 *
 * @param {string} isoString - Fecha en formato ISO (ej. "2025-09-28T23:13:00Z")
 * @returns {string} - Fecha formateada en español peruano (ej. "28 de septiembre de 2025")
 */
export function formatDate(isoString) {
  if (!isoString) return "Fecha no disponible";

  const date = new Date(isoString);

  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}