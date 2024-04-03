import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (search.length === 0 || search.length === 1) return;

    router.push("/search/" + search);
  };

  return (
    <form className="flex items-center gap-3 relative" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar no cardápio"
        className="rounded-sm p-3 pl-14 focus:outline-none w-full md:max-w-md bg-gray-200 bg-opacity-60 placeholder:font-medium font-medium text-gray-800"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit" className="absolute left-4">
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
