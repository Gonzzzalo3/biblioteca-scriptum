import MainLayout from "../../layouts/MainLayout";
import CommentItem from "../../components/user/CommentItem";
import BackToProfileButton from "../../components/user/BackToProfileButton";

export default function MyCommentsPage() {
  const user = {
    name: "Gonzalo Mauricio",
    email: "Gonzalo.caceres@gmail.com",
    avatarUrl: "/users/gonzalo.jpg",
  };

  const comments = [
    {
      userName: user.name,
      userImage: user.avatarUrl,
      rating: 4,
      text: "Muy buen libro, me ayudó bastante en el curso.",
    },
    {
      userName: user.name,
      userImage: user.avatarUrl,
      rating: 5,
      text: "Excelente contenido, lo recomendaría sin duda.",
    },
  ];

  return (
    <MainLayout isLoggedIn={true} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        <BackToProfileButton />
        <h2 className="text-2xl font-bold">Mis comentarios</h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((c, i) => (
              <CommentItem key={i} comment={c} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aún no has hecho comentarios.</p>
        )}
      </div>
    </MainLayout>
  );
}