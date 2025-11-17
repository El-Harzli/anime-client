import SearchSuggestCard from '../cards/SearchSuggestCard';
import { Link } from 'react-router';

function SearchDropDown({ searchData, loading, inputSearchSuggestion, setShowSearchDropdown }) {
  if (!loading && !searchData) return null;

  return (
    <div className="bg-primary absolute left-0 top-full sm:mt-1 w-full overflow-hidden z-[9998]">
      {!loading ? (
        searchData?.length > 0 ? (
          <div>
            {searchData.map((result, index) => (
              <SearchSuggestCard key={index} anime={result} setShowSearchDropdown={setShowSearchDropdown} />
            ))}
            <Link
              onClick={() => setShowSearchDropdown(false)}
              to={`/search?keyword=${inputSearchSuggestion}`}
              className="bg-secondary inline-block w-full py-3 text-center cursor-pointer"
            >
              View all results
            </Link>
          </div>
        ) : (
          <p className="p-3 text-center text-white text-sm">No Results Found</p>
        )
      ) : (
        <div className="p-4 text-center text-sm text-white">Loading...</div>
      )}
    </div>
  );
}

export default SearchDropDown;
