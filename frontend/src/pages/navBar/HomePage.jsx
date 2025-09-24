import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import BooksContainer from "../../components/book/bookContainer";
import { getPopularBooks } from "../../services/book/book";
import { getUserRecommendations } from "../../services/recommendation/recommendation";
import { useUser } from "../../context/UserContext";
import { ROLES } from "../../utils/constants";
import FloatingActionButton from "../../components/ui/FloatingActionButton";
import AdminModal from "../../components/admin/AdminModal";

export default function Home() {
  const { user } = useUser();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsData = [];

        if (user?.id && user?.rol === ROLES.CLIENTE) {
          const recRes = await getUserRecommendations();
          const recBooks = Array.isArray(recRes.data?.recomendaciones)
            ? recRes.data.recomendaciones
            : [];

          if (recBooks.length > 0) {
            const formattedRec = recBooks.map((rec) => ({
              id: rec.Book?.id,
              cover: rec.Book?.portadaUrl || "/covers/default.jpg",
              title: rec.Book?.titulo || "Sin título",
              category: rec.Book?.Category?.nombre || "Sin categoría",
              author: rec.Book?.autor || "Autor desconocido",
            }));

            sectionsData.push({
              title: "Recomendado para ti",
              books: formattedRec,
            });
          }
        }

        const popRes = await getPopularBooks();
        const popBooks = Array.isArray(popRes.data?.libros)
          ? popRes.data.libros
          : [];

        const formattedPop = popBooks.map((book) => ({
          id: book.id,
          cover: book.portadaUrl || "/covers/default.jpg",
          title: book.titulo,
          category: book.Category?.nombre || "Sin categoría",
          author: book.autor || "Autor desconocido",
        }));

        sectionsData.push({
          title: "Lo más popular",
          books: formattedPop,
        });

        setSections(sectionsData);
      } catch (err) {
        console.error("Error al cargar datos de inicio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, user?.rol]);

  return (
    <MainLayout>
      {loading ? (
        <p className="text-center text-gray-500">Cargando libros...</p>
      ) : (
        <BooksContainer sections={sections} />
      )}

      {/* Botón flotante y modal */}
      {user?.rol === ROLES.BIBLIOTECARIO && (
        <>
          <FloatingActionButton onClick={() => setShowAdminModal(true)} />
          {showAdminModal && (
            <AdminModal onClose={() => setShowAdminModal(false)} />
          )}
        </>
      )}
    </MainLayout>
  );
}