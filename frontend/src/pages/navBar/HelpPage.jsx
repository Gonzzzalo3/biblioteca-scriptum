// src/pages/HelpPage.jsx
import MainLayout from "../../layouts/MainLayout";
import HelpSection from "../../components/help/HelpSection";
import HelpItem from "../../components/help/HelpItem";

export default function HelpPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Centro de ayuda</h1>

        {/* Sección: Preguntas frecuentes */}
        <HelpSection title="Preguntas frecuentes">
          <HelpItem
            title="¿Cómo reservo un libro?"
            content="Ve a la sección 'Libros', selecciona el título que deseas y haz clic en 'Reservar'. Recibirás una confirmación si el libro está disponible."
          />
          <HelpItem
            title="¿Qué pasa si me atraso en la devolución?"
            content="Si te atrasas, recibirás una notificación y podrías perder acceso temporal a nuevos préstamos. Recomendamos devolver los libros antes de la fecha límite."
          />
          <HelpItem
            title="¿Puedo sugerir nuevos títulos?"
            content="Sí. Usa la opción 'Enviar Sugerencias' en el menú lateral para proponer libros que te gustaría ver en la biblioteca."
          />
        </HelpSection>

        {/* Sección: Normas y políticas */}
        <HelpSection title="Normas y políticas de uso">
          <HelpItem
            title="Condiciones generales"
            content="El uso de la biblioteca implica aceptar las normas de préstamo, devolución y comportamiento digital responsable."
          />
          <HelpItem
            title="Privacidad y seguridad"
            content="Tus datos están protegidos y no se comparten con terceros. No compartas tu cuenta con otras personas."
          />
          <HelpItem
            title="Conducta esperada"
            content="Se espera respeto en los comentarios, sugerencias y uso de los recursos. Cualquier abuso puede llevar a la suspensión de la cuenta."
          />
        </HelpSection>

        {/* Sección: Canales de contacto */}
        <HelpSection title="Canales de contacto y soporte">
          <HelpItem
            title="Correo electrónico"
            content="Puedes escribirnos a scriptum26@gmail.com para cualquier consulta o problema técnico."
          />
          <HelpItem
            title="WhatsApp"
            content="Contáctanos por WhatsApp al +51 983 395 012. Atención de lunes a viernes de 9am a 6pm."
          />
          <HelpItem
            title="Formulario de sugerencias"
            content="Disponible en la sección 'Enviar Sugerencias' del menú lateral. Puedes proponer mejoras o nuevos libros."
          />
        </HelpSection>
      </div>
    </MainLayout>
  );
}