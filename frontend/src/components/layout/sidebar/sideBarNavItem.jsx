import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function SidebarNavItem({ to, label, type = "normal", icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded transition-colors",
        type === "logout"
          ? "text-red-600 hover:text-red-700 hover:bg-red-100"
          : "text-gray-800 hover:bg-green-200 hover:text-green-900",
        isActive && type !== "logout" && "bg-green-500 text-white"
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{label}</span>
    </Link>
  );
}