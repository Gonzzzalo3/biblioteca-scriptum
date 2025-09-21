import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import BookDetail from "../../components/bookDetail/bookDetail";

export default function BookDetailPage() {
  const { id } = useParams();

  const book = {
    id,
    cover: "/covers/libro1.jpg",
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    category: "Ficción",
    synopsis:
      "Un piloto se encuentra con un pequeño príncipe que viaja de planeta en planeta, aprendiendo sobre la vida, la amistad y el amor. A través de sus encuentros con distintos personajes, el principito reflexiona sobre la naturaleza humana y la importancia de ver con el corazón. Esta obra, cargada de simbolismo y poesía, ha cautivado a lectores de todas las edades durante generaciones.",
    stock: 5,
    comments: [
      {
        userImage: "/users/user1.jpg",
        userName: "María López",
        rating: 5,
        text: "Un clásico que me marcó desde la infancia. Lo releo cada año.",
      },
      {
        userImage: "/users/user2.jpg",
        userName: "Carlos Pérez",
        rating: 4,
        text: "Hermosa historia, aunque esperaba un final diferente.",
      },
    ],
  };

  return (
    <MainLayout isLoggedIn={true} user={{ name: "Gonzalo Cáceres", email: "gonzalo@example.com" }}>
      <BookDetail book={book} />
    </MainLayout>
  );
}