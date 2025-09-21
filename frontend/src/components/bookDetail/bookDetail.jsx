import BookInfo from "./bookInfo";
import BookComments from "./bookComments";

export default function BookDetail({ book }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <BookInfo book={book} />

      {/* Línea divisora */}
      <hr className="my-6 border-gray-300" />

      <BookComments comments={book.comments} />
    </div>
  );
}