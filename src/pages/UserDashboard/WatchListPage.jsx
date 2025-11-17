import { useState, useMemo } from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { Pagination } from '@mui/material';
import { useWatchList } from '@context/WatchListContext';
import WatchListCard from '@components/cards/WatchListCard';

const statuses = ['Watching', 'On-Hold', 'Plan to Watch', 'Completed', 'Dropped'];
const ITEMS_PER_PAGE = 20;

function WatchListPage() {
  const [activeStatus, setActiveStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { watchList } = useWatchList();

  // ✅ Filter by status
  const filteredList = useMemo(() => {
    if (activeStatus === 'All') return [...watchList].reverse();
    return watchList.filter((anime) => anime.status === activeStatus).reverse();
  }, [activeStatus, watchList]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageItems = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ✅ Handle page change
  const handlePageChange = (_, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Pagination style (same as your custom one)
  const paginationStyle = {
    '& .MuiPaginationItem-root': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: '#b4b4b4',
      '&:hover': {
        color: 'var(--color-secondary)',
        backgroundColor: 'rgba(255,255,255,0.08)',
      },
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: 'var(--color-secondary)',
      color: 'black',
      '&:hover': {
        backgroundColor: 'var(--color-secondary)',
      },
    },
  };

  // ✅ Reset page when switching status
  const handleActiveStatus = (status) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  return (
    <section className="mx-auto max-w-[1050px] my-5">
      {/* Header */}
      <h3 className="text-white flex items-center justify-start mb-5">
        <RiHeart3Fill className="me-3 text-3xl md:text-4xl" />
        <span className="text-xl md:text-2xl font-semibold">Watch List</span>
      </h3>

      {/* Filter Tabs */}
      <div className="w-full">
        <ul className="flex justify-start items-center flex-wrap gap-2 mb-5">
          <li
            onClick={() => handleActiveStatus('All')}
            className={`py-1.5 px-5 rounded-md cursor-pointer duration-300 font-medium ${
              activeStatus === 'All'
                ? 'bg-secondary text-black'
                : 'bg-white/10 text-white hover:text-secondary'
            }`}
          >
            All
          </li>

          {statuses.map((st) => (
            <li
              key={st}
              onClick={() => handleActiveStatus(st)}
              className={`py-1.5 px-3 rounded-md cursor-pointer duration-300 font-medium ${
                activeStatus === st
                  ? 'bg-secondary text-black'
                  : 'bg-white/10 text-white hover:text-secondary'
              }`}
            >
              {st}
            </li>
          ))}
        </ul>

        {/* Anime Grid */}
        {currentPageItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-2">
              {currentPageItems.map((anime) => (
                <WatchListCard key={anime.animeId} anime={anime} />
              ))}
            </div>

            {/* ✅ Pagination (only show if > 20) */}
            {filteredList.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center py-6">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  showFirstButton
                  showLastButton
                  onChange={handlePageChange}
                  sx={paginationStyle}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-white/70 text-sm text-center py-10">
            No anime found under “{activeStatus}”
          </div>
        )}
      </div>
    </section>
  );
}

export default WatchListPage;
