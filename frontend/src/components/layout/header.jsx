import SearchBar from "./searchBar/searchBar";
import ProfileArea from "./profileArea";

export default function Header({ isLoggedIn, user }) {
  return (
    <header className="flex items-center justify-between border-b px-6 pt-[22px] pb-[22px]">
      <div className="flex-1 max-w-xl">
        <SearchBar />
      </div>
      <div className="ml-6">
        <ProfileArea isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}