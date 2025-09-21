import Sidebar from "../components/layout/sidebar/sideBar";
import Header from "../components/layout/header";

export default function MainLayout({ children, isLoggedIn, user }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar fija */}
      <Sidebar />

      {/* Contenido principal con margen para no solaparse */}
      <div className="flex-1 flex flex-col ml-64">
        <Header isLoggedIn={isLoggedIn} user={user} />

        <main className="flex-1 p-6 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}