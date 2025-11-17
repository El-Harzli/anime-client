import React, { useRef, useState } from 'react';
import { useAnime } from '@context/AnimeContext';
import { useEffect } from 'react';
import Button from '@components/shared/Button';

import TitledGridSection from '@components/layouts/TitledGridSection';
import CustomPagination from '@components/shared/CustomPagination';
import { useSearchParams } from 'react-router';

function FilterPageV1() {
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
  const { animeData, loading } = useAnime(); // if you track loading in context

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

  // creating a reference to keep the same setTimeout id while waiting for no change in 3sec
  const timeoutRef = useRef(null);

  const [filterResult, setFilterResult] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   // buildQuery only include non-defaults
  //   const buildQuery = () => {
  //     const params = [];

  //     if (animeType !== '0') params.push(`type=${animeType}`);
  //     if (animeStatus !== '0') params.push(`status=${animeStatus}`);
  //     if (animeRating !== '0') params.push(`rated=${animeRating}`);
  //     if (animeScore !== '0') params.push(`score=${animeScore}`);
  //     if (animeSeason !== '0') params.push(`season=${animeSeason}`);
  //     if (animeLanguage !== '0') params.push(`language=${animeLanguage}`);

  //     // Remove hyphens

  //     if (animeStartDate.year !== '') params.push(`sy=${animeStartDate.year}`);
  //     if (animeStartDate.month !== '') params.push(`sm=${animeStartDate.month}`);
  //     if (animeStartDate.day !== '') params.push(`sd=${animeStartDate.day}`);

  //     if (animeEndDate.year !== '') params.push(`ey=${animeEndDate.year}`);
  //     if (animeEndDate.month !== '') params.push(`em=${animeEndDate.month}`);
  //     if (animeEndDate.day !== '') params.push(`ed=${animeEndDate.day}`);

  //     if (animeGenres.length > 0) {
  //       const genresParam = animeGenres.join(',');
  //       params.push(`genres=${encodeURIComponent(genresParam)}`);
  //     }

  //     params.push(
  //       `sort=${animeSort
  //         .toLowerCase()
  //         .replace(/\s+/g, '_') // Replace spaces with underscores
  //         .replace(/-/g, '')}`
  //     );

  //     // params.push(page);

  //     return params.join('&');
  //   };

  //   const query = buildQuery();
  //   setQuery(query);
  //   console.log('Final query:', query);
  //   return () => {};
  // }, [
  //   animeType,
  //   animeStatus,
  //   animeRating,
  //   animeScore,
  //   animeSeason,
  //   animeLanguage,
  //   animeSort,
  //   animeEndDate.day,
  //   animeEndDate.month,
  //   animeEndDate.year,
  //   animeStartDate.day,
  //   animeStartDate.month,
  //   animeStartDate.year,
  //   animeGenres,
  // ]);

  // place this in your component (make sure useRef is imported)
  const prevFiltersRef = useRef(null);

  useEffect(() => {
    // Build an object representing the current filters (only the parts that matter)
    const currentFilters = {
      animeType,
      animeStatus,
      animeRating,
      animeScore,
      animeSeason,
      animeLanguage,
      animeSort,
      animeStartDate,
      animeEndDate,
      animeGenres: animeGenres.slice().sort(), // stable ordering
    };

    // Helper to build the params object from currentFilters and a page value
    const buildParams = (filtersObj, pageValue) => {
      const params = {};

      if (filtersObj.animeType !== '0') params.type = filtersObj.animeType;
      if (filtersObj.animeStatus !== '0') params.status = filtersObj.animeStatus;
      if (filtersObj.animeRating !== '0') params.rated = filtersObj.animeRating;
      if (filtersObj.animeScore !== '0') params.score = filtersObj.animeScore;
      if (filtersObj.animeSeason !== '0') params.season = filtersObj.animeSeason;
      if (filtersObj.animeLanguage !== '0') params.language = filtersObj.animeLanguage;

      if (filtersObj.animeStartDate?.year) params.sy = filtersObj.animeStartDate.year;
      if (filtersObj.animeStartDate?.month) params.sm = filtersObj.animeStartDate.month;
      if (filtersObj.animeStartDate?.day) params.sd = filtersObj.animeStartDate.day;

      if (filtersObj.animeEndDate?.year) params.ey = filtersObj.animeEndDate.year;
      if (filtersObj.animeEndDate?.month) params.em = filtersObj.animeEndDate.month;
      if (filtersObj.animeEndDate?.day) params.ed = filtersObj.animeEndDate.day;

      if (filtersObj.animeGenres && filtersObj.animeGenres.length > 0) params.genres = filtersObj.animeGenres.join(',');

      if (filtersObj.animeSort)
        params.sort = String(filtersObj.animeSort).toLowerCase().replace(/\s+/g, '_').replace(/-/g, '');

      if (pageValue) params.page = pageValue;

      return params;
    };

    // Compare previous filters to current (stringified)
    const prevFilters = prevFiltersRef.current;
    const prevFiltersJson = prevFilters ? JSON.stringify(prevFilters) : null;
    const currentFiltersJson = JSON.stringify(currentFilters);

    // Determine whether filters changed since last run
    const filtersChanged = prevFiltersJson !== currentFiltersJson;

    // Determine the page to use:
    // - if filters changed -> reset to 1
    // - else keep current page from URL (page variable)
    const currentPageFromUrl = parseInt(searchParams.get('page')) || 1;
    const desiredPage = filtersChanged ? 1 : currentPageFromUrl;

    // Build the params object we *want* in the URL
    const newParamsObj = buildParams(currentFilters, desiredPage);

    // Build a string to compare with current searchParams
    const newQueryString = new URLSearchParams(newParamsObj).toString();
    const currentQueryString = searchParams.toString();

    // Only update state / URL if the new query is different than current
    if (newQueryString !== currentQueryString) {
      // setQuery used for fetching
      setQuery(newQueryString);

      // update URL; pass the object so React Router serializes it
      setSearchParams(newParamsObj);
    } else {
      // still update local query state if identical (so fetch effect triggers correctly)
      setQuery(newQueryString);
    }

    // Save currentFilters snapshot for next render comparison
    prevFiltersRef.current = currentFilters;
  }, [
    // list all filter primitives/objects that should trigger this effect
    animeType,
    animeStatus,
    animeRating,
    animeScore,
    animeSeason,
    animeLanguage,
    animeSort,
    animeStartDate,
    animeEndDate,
    animeGenres,
    // include searchParams.page read (we read searchParams above via searchParams.get('page')),
    // but do NOT include the entire searchParams object (unstable)
    page,
    // include setters that are stable not required in deps, but having page is enough
  ]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

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
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchFilter = async () => {
      try {
        setFilterLoading(true);
        const endpoint = `${import.meta.env.VITE_API_URL}/filter?${query}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch Filter Results');
        const data = await res.json();
        setFilterResult(data.animeList);
        setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
      } catch (error) {
        setError(error.message);
      } finally {
        setFilterLoading(false);
      }
    };

    fetchFilter();

    // Cleanup on unmount
    return () => {
      // if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // console.log('Cleanup called. Abort fetching anime by id data...');
      controller.abort();
    };
  }, [query, page]);

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    try {
      setFilterLoading(true);
      setError(null);

      const endpoint = `${import.meta.env.VITE_API_URL}/filter?${query}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch Filter Results');

      const data = await res.json();
      setFilterResult(data.animeList || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
    } catch (error) {
      setError(error.message);
    } finally {
      setFilterLoading(false);
    }
  };

  const toggleGenre = (genre) => {
    setAnimeGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((item) => item !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };


  const handleStartDateChange = (field, value) => {
    setAnimeStartDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEndDateChange = (field, value) => {
    setAnimeEndDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="my-container  ">
      <form onSubmit={handleFilterSubmit} className="max-w-[1200px] mx-auto my-5 bg-white/20 p-5 rounded-md text-white">
        <h2 className="font-medium mb-4 ">Filter</h2>
        <div className="flex justify-start items-center gap-x-3 gap-y-2 flex-wrap text-sm mb-4">
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Type</span>
            <select
              value={animeType}
              onChange={(e) => setAnimeType(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {types?.map((type, index) => {
                return (
                  <option key={type} className="bg-primary text-secondary" value={index}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Status</span>
            <select
              value={animeStatus}
              onChange={(e) => setAnimeStatus(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {status?.map((statue, index) => {
                return (
                  <option key={statue} className="bg-primary text-secondary" value={index}>
                    {statue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Rated</span>
            <select
              value={animeRating}
              onChange={(e) => setAnimeRating(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {ratings?.map((rating, index) => {
                return (
                  <option key={rating} className="bg-primary text-secondary" value={index}>
                    {rating}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Score</span>
            <select
              value={animeScore}
              onChange={(e) => setAnimeScore(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {scores?.map((score, index) => {
                return (
                  <option key={score} className="bg-primary text-secondary" value={index}>
                    {score}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Season</span>
            <select
              value={animeSeason}
              onChange={(e) => setAnimeSeason(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {seasons?.map((season, index) => {
                return (
                  <option key={season} className="bg-primary text-secondary" value={index}>
                    {season}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Language</span>
            <select
              value={animeLanguage}
              onChange={(e) => setAnimeLanguage(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {languages?.map((language, index) => {
                return (
                  <option key={language} className="bg-primary text-secondary" value={index}>
                    {language}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-start items-center gap-x-3 gap-y-2 flex-wrap text-sm mb-4">
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Start Date</span>
            <select
              value={animeStartDate.year}
              onChange={(e) => handleStartDateChange('year', e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option className="bg-primary text-secondary" value={''}>
                Year
              </option>
              {Array.from({ length: currentYear - 1967 + 1 }, (_, index) => currentYear - index).map((year) => {
                return (
                  <option key={year} className="bg-primary text-secondary" value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <select
              value={animeStartDate.month}
              onChange={(e) => handleStartDateChange('month', e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option className="bg-primary text-secondary" value={''}>
                Month
              </option>
              {Array.from({ length: 12 }).map((_, index) => {
                return (
                  <option key={index + 1} className="bg-primary text-secondary" value={index + 1}>
                    {String(index + 1).padStart(2, '0')}
                  </option>
                );
              })}
            </select>
            <select
              value={animeStartDate.day}
              onChange={(e) => handleStartDateChange('day', e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option className="bg-primary text-secondary" value={''}>
                Day
              </option>
              {Array.from({ length: 31 }).map((_, index) => {
                return (
                  <option key={index + 1} className="bg-primary text-secondary" value={index + 1}>
                    {String(index + 1).padStart(2, '0')}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">End Date</span>
            <select
              value={animeEndDate.year}
              onChange={(e) => handleEndDateChange('year', e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option className="bg-primary text-secondary" value={''}>
                Year
              </option>
              {Array.from({ length: currentYear - 1967 + 1 }, (_, index) => currentYear - index).map((year) => {
                return (
                  <option key={year} className="bg-primary text-secondary" value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <select
              value={animeEndDate.month}
              onChange={(e) => handleEndDateChange('month', e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option className="bg-primary text-secondary" value={''}>
                Month
              </option>
              {Array.from({ length: 12 }).map((_, index) => {
                return (
                  <option key={index + 1} className="bg-primary text-secondary" value={index + 1}>
                    {String(index + 1).padStart(2, '0')}
                  </option>
                );
              })}
            </select>
            <select
              value={animeEndDate.day}
              onChange={(e) => handleEndDateChange('day', e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              <option className="bg-primary text-secondary" value={''}>
                Day
              </option>
              {Array.from({ length: 31 }).map((_, index) => {
                return (
                  <option key={index + 1} className="bg-primary text-secondary" value={index + 1}>
                    {String(index + 1).padStart(2, '0')}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-x-3 ps-3 pe-1 py-2 border border-neutral-500 rounded-sm">
            <span className=" font-medium">Sort</span>
            <select
              value={animeSort}
              onChange={(e) => setAnimeSort(e.target.value)}
              name=""
              id=""
              className="text-secondary pe-3 outline-0 cursor-pointer"
            >
              {sorts?.map((sort) => {
                return (
                  <option key={sort} className="bg-primary text-secondary" value={sort}>
                    {sort}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <h2 className="font-medium mb-4">Genre</h2>
        <div className="w-full flex flex-wrap justify-start items-center gap-x-3 gap-y-2 mb-4">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => {
                return <span key={index}></span>;
              })
            : animeData?.genres?.map((genre, index) => {
                const capilatizeGenre = genre[0].toUpperCase() + genre.slice(1);
                return (
                  <span
                    key={capilatizeGenre}
                    onClick={() => toggleGenre(index + 1)}
                    className={`px-3 py-1 border  rounded-sm cursor-pointer  transition-colors duration-300 ${
                      animeGenres.includes(index + 1)
                        ? 'border-secondary text-secondary'
                        : 'border-neutral-500 hover:text-secondary'
                    }`}
                  >
                    {capilatizeGenre}
                  </span>
                );
              })}
        </div>
        {/* <Button label="Filter" customCss="bg-secondary rounded-md text-black font-medium" /> */}
        <button
          type="submit"
          className="bg-secondary rounded-md text-black font-medium px-4 py-2.5 text-center cursor-pointer flex items-center justify-center"
        >
          Filter
        </button>
      </form>
      <TitledGridSection title="Filter Result" animeData={filterResult} loading={filterLoading} />
      {pagination.totalPages > 1 && (
        <CustomPagination pagination={pagination} setSearchParams={setSearchParams} page={page} />
      )}
    </div>
  );
}

export default FilterPageV1;
