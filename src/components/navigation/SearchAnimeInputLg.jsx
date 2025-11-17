import React, { useState, useEffect, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';
import SearchDropDown from '@components/widgets/SearchDropDown';

function SearchAnimeInputLg() {
  const [inputSearchSuggestion, setInputSearchSuggestion] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const timeoutRef = useRef(null);

  const [searchData, setSearchData] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true);
  const [searchError, setSearchError] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const navigate = useNavigate();

  const wrapperRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowSearchDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


  const handleOnInputChange = (e) => {
    const value = e.target.value;
    setInputSearchSuggestion(value);
    setShowSearchDropdown(value.trim().length >= 2);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(value.trim());
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputSearchSuggestion.trim();
    if (query.length < 2) return;

    // Abort any ongoing search before navigating
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowSearchDropdown(false);
    setSearchData([]); // clear suggestions
    setIsSearchLoading(false);

    navigate(`/search?keyword=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) return;
    const controller = new AbortController();

    const fetchSearchSuggest = async () => {
      setIsSearchLoading(true);
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/search/input/${debouncedSearchTerm}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch servers');
        const { data } = await res.json();
        setSearchData(data?.suggestions || []);
        setShowSearchDropdown(true);
      } catch (err) {
        if (err.name !== 'AbortError') setSearchError(err.message);
      } finally {
        setIsSearchLoading(false);
      }
    };

    fetchSearchSuggest();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      controller.abort();
    };
  }, [debouncedSearchTerm]);

  const handleFocus = () => {
    if (inputSearchSuggestion.trim().length >= 2) {
      setShowSearchDropdown(true);
    }
  };

  const handleBlur = () => {
    // Optional delay so user can click inside dropdown
    // setTimeout(() => setShowSearchDropdown(false), 150);
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSubmit} className="h-full relative py-0.5 hidden xl:block">
      {showSearchDropdown && (
        <SearchDropDown
          searchData={searchData}
          loading={isSearchLoading}
          inputSearchSuggestion={inputSearchSuggestion}
          setShowSearchDropdown={setShowSearchDropdown}
        />
      )}

      <div className="absolute inset-y-0 right-3 flex justify-center items-center gap-3">
        <button type="submit" className="text-xl cursor-pointer text-gray-950">
          <IoSearch />
        </button>
        <Link
          to="/filter"
          className="text-white bg-black rounded-sm text-xs py-1 px-2 font-light cursor-pointer hover:bg-secondary hover:text-black transition-colors duration-300"
        >
          Filter
        </Link>
      </div>

      <input
        className="h-full xl:min-w-90 2xl:min-w-110 rounded-sm border bg-white text-black ps-4 pe-28 outline-0"
        type="text"
        name="keyword"
        id="keyword"
        placeholder="Search Anime..."
        autoComplete="off"
        value={inputSearchSuggestion}
        onChange={handleOnInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </form>
  );
}

export default SearchAnimeInputLg;
