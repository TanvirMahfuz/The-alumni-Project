import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSearchStore } from "../../store/useSearchStore.js";

import SearchResultUsers from "../../components/search/SearchResultUsers/SearchResultUsers.jsx";
import SearchResultCompanies from "../../components/search/SearchResultCompanies/SearchResultCompanies.jsx";

function SearchPage() {
  const location = useLocation();
  const { searchResults, isLoading, search } = useSearchStore();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const value = queryParams.get("value");

  useEffect(() => {
    if (category && value) {
      search(category, value);
    }
  }, [category, value]);

  return (
    <div>

      {isLoading && (
        <p className="mt-10 text-center text-gray-500 dark:text-gray-400">Searching…</p>
      )}

      {!isLoading && category === "name" && (
        <SearchResultUsers searchResults={searchResults} />
      )}

      {!isLoading && category === "session" && (
        <SearchResultUsers searchResults={searchResults} title="Session Results" />
      )}

      {!isLoading && category === "company" && (
        <SearchResultCompanies searchResults={searchResults} />
      )}
    </div>
  );
}
export default SearchPage;
