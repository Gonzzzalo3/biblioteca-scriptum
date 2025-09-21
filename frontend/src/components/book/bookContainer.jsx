import BookSection from "./bookSection";

export default function BooksContainer({ sections }) {
  return (
    <div className="space-y-10">
      {sections.map((section, index) => (
        <BookSection
          key={index}
          title={section.title}
          books={section.books}
        />
      ))}
    </div>
  );
}