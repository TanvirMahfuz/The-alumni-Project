import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore.js";

import SearchResultUsers from "../components/search/SearchResultUsers.jsx";
import SearchResultCompanies from "../components/search/SearchResultCompanies.jsx";

function SearchPage() {
  const location = useLocation();
  const { searchResults, isLoading, search } = useSearchStore();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const value = queryParams.get("value");

  useEffect(() => {
    if (category && value) {
      console.log("Fetching data for:", category, value);
      search(category, value);
    }
  }, [category, value]);

  return (
    <div>
      <h2>
        Search Results for "{value}" in "{category}"
      </h2>

      {category === "name" && <SearchResultUsers searchResults={searchResults} />}

      {category === "company" && (
        <SearchResultCompanies searchResults={searchResults} />
      )}
    </div>
  );
}
export default SearchPage;
