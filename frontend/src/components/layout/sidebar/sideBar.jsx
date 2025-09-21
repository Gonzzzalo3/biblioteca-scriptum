import SidebarLogo from "./sideBarLogo";
import SidebarNav from "./sideBarNav";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#c7ffbe] text-gray-800 flex flex-col">
      <SidebarLogo />
      <SidebarNav />
    </aside>
  );
}