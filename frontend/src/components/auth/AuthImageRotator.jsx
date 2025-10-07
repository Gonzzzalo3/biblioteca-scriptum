// src/components/auth/AuthImageRotator.jsx

import { useState, useEffect } from 'react';

// Lista de imágenes locales utilizadas en el carrusel
const imagenes = [
  '/assets/auth1.png',
  '/assets/auth2.png',
  '/assets/auth3.png',
  '/assets/auth4.png',
];

// Componente que rota imágenes de fondo con efecto de transición
export default function AuthImageRotator() {
  // Índice actual de la imagen mostrada
  const [index, setIndex] = useState(0);

  // Estado para controlar la opacidad (fade-in / fade-out)
  const [fade, setFade] = useState(true);

  // Efecto que inicia el ciclo de rotación de imágenes
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFade(false); // Inicia transición de salida

      setTimeout(() => {
        // Avanza al siguiente índice de imagen
        setIndex((prev) => (prev + 1) % imagenes.length);
        setFade(true); // Inicia transición de entrada
      }, 500); // Duración del fade-out
    }, 7000); // Intervalo entre imágenes

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="w-1/2 h-screen bg-black relative overflow-hidden">
      <img
        src={imagenes[index]}
        alt="Imagen educativa"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}