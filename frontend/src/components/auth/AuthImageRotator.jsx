import { useState, useEffect } from 'react';

const imagenes = [
  '/assets/auth1.png',
  '/assets/auth2.png',
  '/assets/auth3.png',
  '/assets/auth4.png',
];

export default function AuthImageRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 7000); // cambia cada 5 segundos

    return () => clearInterval(intervalo); // limpia el intervalo al desmontar
  }, []);

  return (
    <div className="w-1/2 bg-green-100 flex items-center justify-center">
      <img
        src={imagenes[index]}
        alt="Imagen educativa"
        className="max-h-[80%] object-contain transition-opacity duration-500"
      />
    </div>
  );
}