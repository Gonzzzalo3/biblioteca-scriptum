import { Link } from "react-router-dom";

export default function SidebarLogo() {
  return (
    <Link
      to="/"
      className="flex items-center justify-center w-full h-24"
    >
      <img
        src="/assets/Scriptum-logo.png"
        alt="Logo de biblioteca"
        className="h-[180px] w-auto object-contain"
      />
    </Link>
  );
}