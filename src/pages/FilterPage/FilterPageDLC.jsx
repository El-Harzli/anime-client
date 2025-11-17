import React, { useRef, useState, useEffect } from 'react';
import { useAnime } from '@context/animeContext';
import Button from '@components/shared/Button';
import TitledGridSection from '@components/layouts/TitledGridSection';
import CustomPagination from '@components/shared/CustomPagination';
import { useSearchParams } from 'react-router';

function FilterPage() {
  const types = ['All', 'Movie', 'TV', 'OVA', 'ONA', 'Special', 'Music'];
  const status = ['All', 'Finished Airing', 'Currently Airing', 'Not yet aired'];
  const ratings = ['All', 'G', 'PG', 'PG-13', 'R', 'R+', 'Rx'];
  const scores = [
    'All',
    '(1) Appalling',
    '(2) Horrible',
    '(3) Very Bad',
    '(4) Bad',
    '(5) Average',
    '(6) Fine',
    '(7) Good',
    '(8) Very Good',
    '(9) Great',
    '(10) Masterpiece',
  ];
  const seasons = ['All', 'Spring', 'Summer', 'Winter', 'Fall'];
  const languages = ['All', 'SUB', 'DUB', 'SUB & DUB'];
  const sorts = ['Default', 'Recently Added', 'Recently Updated', 'Score', 'Name A-Z', 'Release Date', 'Most Watched'];
  const currentYear = new Date().getFullYear();
  const { animeData, loading } = useAnime();

  const [animeType, setAnimeType] = useState('0');
  const [animeStatus, setAnimeStatus] = useState('0');
  const [animeRating, setAnimeRating] = useState('0');
  const [animeScore, setAnimeScore] = useState('0');
  const [animeSeason, setAnimeSeason] = useState('0');
  const [animeLanguage, setAnimeLanguage] = useState('0');
  const [animeSort, setAnimeSort] = useState('default');
  const [animeStartDate, setAnimeStartDate] = useState({ year: '', month: '', day: '' });
  const [animeEndDate, setAnimeEndDate] = useState({ year: '', month: '', day: '' });
  const [animeGenres, setAnimeGenres] = useState([]);

  const [filterResult, setFilterResult] = useState([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const [query, setQuery] = useState('');

  // Ref to ensure we only perform the INITIAL fetch once
  const initialFetchDone = useRef(false);

  // 🧩 Build query and sync with URL (for sharing / link consistency)
  useEffect(() => {
    const buildQuery = () => {
      const params = {};
      if (animeType !== '0') params.type = animeType;
      if (animeStatus !== '0') params.status = animeStatus;
      if (animeRating !== '0') params.rated = animeRating;
      if (animeScore !== '0') params.score = animeScore;
      if (animeSeason !== '0') params.season = animeSeason;
      if (animeLanguage !== '0') params.language = animeLanguage;

      if (animeStartDate.year) params.sy = animeStartDate.year;
      if (animeStartDate.month) params.sm = animeStartDate.month;
      if (animeStartDate.day) params.sd = animeStartDate.day;

      if (animeEndDate.year) params.ey = animeEndDate.year;
      if (animeEndDate.month) params.em = animeEndDate.month;
      if (animeEndDate.day) params.ed = animeEndDate.day;

      if (animeGenres.length > 0) params.genres = animeGenres.join(',');

      params.sort = animeSort.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '');
      if (searchParams.get('page')) params.page = searchParams.get('page');
      return params;
    };

    const queryObj = buildQuery();
    // update the local query string used for manual fetch
    setQuery(new URLSearchParams(queryObj).toString());
    // update URL so it is shareable
    setSearchParams(queryObj);

  }, [
    animeType,
    animeStatus,
    animeRating,
    animeScore,
    animeSeason,
    animeLanguage,
    animeSort,
    animeEndDate,
    animeStartDate,
    animeGenres,
    searchParams,
    setSearchParams,
  ]);

  // 🧩 Load filters from URL on mount and perform ONE initial fetch
  // We watch searchParams so that:
  // - If the user opens /filter?foo=bar it triggers here
  // - If the component writes default sort (via build query) and updates searchParams,
  //   this effect will run once when searchParams first becomes non-empty.
  // But we guard with initialFetchDone so we only fetch one time.
  useEffect(() => {
    // If we've already done the initial fetch, do nothing.
    if (initialFetchDone.current) return;

    const params = Object.fromEntries([...searchParams]);

    // Update local state from URL (important for initializing selects)
    if (params.type) setAnimeType(params.type);
    if (params.status) setAnimeStatus(params.status);
    if (params.rated) setAnimeRating(params.rated);
    if (params.score) setAnimeScore(params.score);
    if (params.season) setAnimeSeason(params.season);
    if (params.language) setAnimeLanguage(params.language);
    if (params.sort) setAnimeSort(params.sort);

    if (params.sy || params.sm || params.sd)
      setAnimeStartDate({ year: params.sy || '', month: params.sm || '', day: params.sd || '' });

    if (params.ey || params.em || params.ed)
      setAnimeEndDate({ year: params.ey || '', month: params.em || '', day: params.ed || '' });

    if (params.genres) setAnimeGenres(params.genres.split(',').map(Number));

    // Decide if we need to fetch initially:
    // - fetch if there are any params present
    // - OR fetch if sort is 'default' (covers the case when we wrote sort=default into the URL)
    if (Object.keys(params).length > 0 || params.sort === 'default') {
      const controller = new AbortController();

      const fetchFilter = async () => {
        try {
          setIsFilterLoading(true);
          const endpoint =
            page > 1
              ? `${import.meta.env.VITE_API_URL}/filter?${searchParams.toString()}&page=${page}`
              : `${import.meta.env.VITE_API_URL}/filter?${searchParams.toString()}`;
          const res = await fetch(endpoint, { signal: controller.signal });
          if (!res.ok) throw new Error('Failed to fetch Filter Results');
          const data = await res.json();
          setFilterResult(data.animeList || []);
          setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
        } catch (error) {
          setError(error.message);
        } finally {
          setIsFilterLoading(false);
        }
      };

      // perform initial fetch
      fetchFilter();
    }

    // Mark initial fetch logic as done (so future searchParams updates by UI won't auto-fetch)
    initialFetchDone.current = true;

    // We don't return a controller.abort here because we might already have completed the fetch.
    // If you prefer abort on unmount you can add it; keeping it minimal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, page]); // run when searchParams changes initially

  // ✅ Manual filter button submit — only runs when user presses
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFilterLoading(true);
      setError(null);
      const endpoint =
        page > 1
          ? `${import.meta.env.VITE_API_URL}/filter?${query}&page=${page}`
          : `${import.meta.env.VITE_API_URL}/filter?${query}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch Filter Results');
      const data = await res.json();
      setFilterResult(data.animeList || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFilterLoading(false);
    }
  };

  const toggleGenre = (genre) => {
    setAnimeGenres((prev) => (prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]));
  };

  const handleStartDateChange = (field, value) => {
    setAnimeStartDate((prev) => ({ ...prev, [field]: value }));
  };
  const handleEndDateChange = (field, value) => {
    setAnimeEndDate((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="my-container">
      <form onSubmit={handleFilterSubmit} className="max-w-[1200px] mx-auto my-5 bg-white/20 p-5 rounded-md text-white">
        <h2 className="font-medium mb-4 ">Filter</h2>

        {/* ======================= Filter Selects ======================= */}
        <div className="flex justify-start items-center gap-x-3 gap-y-2 flex-wrap text-sm mb-4">
          {/* Type */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Type</span>
            <select
              value={animeType}
              onChange={(e) => setAnimeType(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {types.map((type, index) => (
                <option key={type} className="bg-primary text-secondary" value={index}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Status</span>
            <select
              value={animeStatus}
              onChange={(e) => setAnimeStatus(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {status.map((s, index) => (
                <option key={s} className="bg-primary text-secondary" value={index}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Rated */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Rated</span>
            <select
              value={animeRating}
              onChange={(e) => setAnimeRating(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {ratings.map((rating, index) => (
                <option key={rating} className="bg-primary text-secondary" value={index}>
                  {rating}
                </option>
              ))}
            </select>
          </div>

          {/* Score */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Score</span>
            <select
              value={animeScore}
              onChange={(e) => setAnimeScore(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {scores.map((score, index) => (
                <option key={score} className="bg-primary text-secondary" value={index}>
                  {score}
                </option>
              ))}
            </select>
          </div>

          {/* Season */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Season</span>
            <select
              value={animeSeason}
              onChange={(e) => setAnimeSeason(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {seasons.map((season, index) => (
                <option key={season} className="bg-primary text-secondary" value={index}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Language</span>
            <select
              value={animeLanguage}
              onChange={(e) => setAnimeLanguage(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {languages.map((language, index) => (
                <option key={language} className="bg-primary text-secondary" value={index}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ======================= Date & Sort ======================= */}
        <div className="flex justify-start items-center gap-x-3 gap-y-2 flex-wrap text-sm mb-4">
          {/* Start Date */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Start Date</span>
            <select
              value={animeStartDate.year}
              onChange={(e) => handleStartDateChange('year', e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option value="">Year</option>
              {Array.from({ length: currentYear - 1967 + 1 }, (_, index) => currentYear - index).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={animeStartDate.month}
              onChange={(e) => handleStartDateChange('month', e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {String(index).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              value={animeStartDate.day}
              onChange={(e) => handleStartDateChange('day', e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }).map((_, index) => (
                <option key={index} value={index}>
                  {String(index).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          {/* End Date */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">End Date</span>
            <select
              value={animeEndDate.year}
              onChange={(e) => handleEndDateChange('year', e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option value="">Year</option>
              {Array.from({ length: currentYear - 1967 + 1 }, (_, index) => currentYear - index).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={animeEndDate.month}
              onChange={(e) => handleEndDateChange('month', e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {String(index).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              value={animeEndDate.day}
              onChange={(e) => handleEndDateChange('day', e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }).map((_, index) => (
                <option key={index} value={index}>
                  {String(index).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className="font-medium">Sort</span>
            <select
              value={animeSort}
              onChange={(e) => setAnimeSort(e.target.value)}
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {sorts.map((sort) => (
                <option key={sort} className="bg-primary text-secondary" value={sort}>
                  {sort}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ======================= Genre ======================= */}
        <h2 className="font-medium mb-4">Genre</h2>
        <div className="w-full flex flex-wrap justify-start items-center gap-x-3 gap-y-2 mb-4">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => <span key={index}></span>)
            : animeData?.genres?.map((genre, index) => {
                const cap = genre[0].toUpperCase() + genre.slice(1);
                return (
                  <span
                    key={cap}
                    onClick={() => toggleGenre(index + 1)}
                    className={`px-3 py-1 border rounded-sm cursor-pointer transition-colors duration-300 ${
                      animeGenres.includes(index + 1)
                        ? 'border-secondary text-secondary'
                        : 'border-neutral-500 hover:text-secondary'
                    }`}
                  >
                    {cap}
                  </span>
                );
              })}
        </div>

        {/* ======================= Submit Button ======================= */}
        <button
          type="submit"
          className="bg-secondary rounded-md text-black font-medium px-4 py-2.5 text-center cursor-pointer flex items-center justify-center"
        >
          Filter
        </button>
      </form>

      {/* ======================= Results ======================= */}
      <TitledGridSection title="Filter Result" animeData={filterResult} loading={isFilterLoading} />
      {pagination.totalPages > 1 && (
        <CustomPagination pagination={pagination} setSearchParams={setSearchParams} page={page} />
      )}
    </div>
  );
}

export default FilterPage;
