// utils/formatDate.js
export function formatDate(isoString) {
  if (!isoString) return "Fecha no disponible";

  const date = new Date(isoString);
  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}