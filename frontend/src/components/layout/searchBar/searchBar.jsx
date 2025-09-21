import SearchButton from "./searchButton";
import SearchInput from "./searchInput";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex items-center bg-gray-100 rounded px-4 py-2 w-full">
      <SearchInput value={value} onChange={onChange} />
      <SearchButton onClick={onSearch} />
    </div>
  );
}