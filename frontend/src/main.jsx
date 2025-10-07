import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Estilos globales
import App from './App.jsx'; // Componente raíz de la aplicación
import { UserProvider } from './context/UserContext.jsx'; // Contexto global de usuario

// Punto de entrada de la aplicación React
// Renderiza el árbol principal dentro del elemento #root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> 
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);