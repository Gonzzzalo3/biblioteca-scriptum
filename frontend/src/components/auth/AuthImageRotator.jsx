// src/components/auth/AuthImageRotator.jsx

import { useState, useEffect } from 'react';

const imagenes = [
  '/assets/auth1.png',
  '/assets/auth2.png',
  '/assets/auth3.png',
  '/assets/auth4.png',
];

export default function AuthImageRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFade(false); // inicia fade-out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % imagenes.length);
        setFade(true); // inicia fade-in
      }, 500); // duración del fade-out
    }, 7000);

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