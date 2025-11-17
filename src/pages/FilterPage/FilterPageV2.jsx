import { useEffect, useState } from 'react';
import { useAnime } from '@context/animeContext';
import { useSearchParams } from 'react-router';

import TitledGridSection from '@components/layouts/TitledGridSection';
import CustomPagination from '@components/shared/CustomPagination';

function FilterPageV2() {
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

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [query, setQuery] = useState('');

  const [filterResult, setFilterResult] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const [searchPage, setSearchPage] = useState(0);

  // Lets first build our query from input change
  useEffect(() => {
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
    let params = {};

    if (currentFilters.animeType !== '0') params.type = currentFilters.animeType;
    if (currentFilters.animeStatus !== '0') params.status = currentFilters.animeStatus;
    if (currentFilters.animeRating !== '0') params.rated = currentFilters.animeRating;
    if (currentFilters.animeScore !== '0') params.score = currentFilters.animeScore;
    if (currentFilters.animeSeason !== '0') params.season = currentFilters.animeSeason;
    if (currentFilters.animeLanguage !== '0') params.language = currentFilters.animeLanguage;

    if (currentFilters.animeStartDate?.year) params.sy = currentFilters.animeStartDate.year;
    if (currentFilters.animeStartDate?.month) params.sm = currentFilters.animeStartDate.month;
    if (currentFilters.animeStartDate?.day) params.sd = currentFilters.animeStartDate.day;

    if (currentFilters.animeEndDate?.year) params.ey = currentFilters.animeEndDate.year;
    if (currentFilters.animeEndDate?.month) params.em = currentFilters.animeEndDate.month;
    if (currentFilters.animeEndDate?.day) params.ed = currentFilters.animeEndDate.day;

    if (currentFilters.animeGenres && currentFilters.animeGenres.length > 0)
      params.genres = currentFilters.animeGenres.join(',');

    if (currentFilters.animeSort)
      params.sort = String(currentFilters.animeSort).toLowerCase().replace(/\s+/g, '_').replace(/-/g, '');
    if (searchPage !== 1 && searchPage > 1) params.page = searchPage;
    // Build the query string
    const searchParams = new URLSearchParams(params).toString();
    setQuery(searchParams);
  }, [
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
    searchPage,
  ]);

  // Lets build our query from URL change
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

    if (params.page) setSearchPage(params.page);
  }, [searchParams]);

useEffect(() => {
  const controller = new AbortController(); // Create new controller for this request

  const fetchData = async () => {
    try {
      setFilterLoading(true);
      setError(null);

      const endpoint = `${import.meta.env.VITE_API_URL}/filter?${query}`;
      const res = await fetch(endpoint, { signal: controller.signal });

      if (!res.ok) throw new Error('Failed to fetch Filter Results');
      const data = await res.json();

      setFilterResult(data.animeList || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
    } catch (error) {
      // Ignore abort errors
      if (error.name === 'AbortError') return;
      setError(error.message);
    } finally {
      setFilterLoading(false);
    }
  };

  fetchData();

  // Cleanup → abort the previous request when query changes or component unmounts
  return () => {
    console.log('Aborting previous filter request...');
    controller.abort();
  };
}, [query]);


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
      <form className="max-w-[1200px] mx-auto my-5 bg-white/20 p-5 rounded-md text-white">
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

export default FilterPageV2;
