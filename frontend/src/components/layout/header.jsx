import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar/searchBar";
import ProfileArea from "./profileArea";

export default function Header({ isLoggedIn, user }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between border-b px-6 pt-[22px] pb-[22px]">
      <div className="flex-1 max-w-xl">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="ml-6">
        <ProfileArea isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}