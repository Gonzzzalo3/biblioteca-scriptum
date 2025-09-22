export default function UserHeader({ img, nombres, apellidos }) {
  return (
    <div className="flex justify-center">
      <img
        src={img}
        alt={`${nombres} ${apellidos}`}
        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
      />
    </div>
  );
}