import React, { useEffect, useState, useMemo } from 'react';
import ContinueWatchingCard from '@components/cards/ContinueWatchingCard';
import { useLocation, useNavigate } from 'react-router';
import { FaChevronRight } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';
import { Pagination } from '@mui/material';
import { toast } from 'sonner';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useAuth } from '@context/authContext';

const ITEMS_PER_PAGE = 5;

function ContinueWatching({ onEmptyChange, showAll = false }) {
  const [continueWatchingData, setContinueWatchingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Load data on mount
  useEffect(() => {
    setLoading(true);
    const saved = JSON.parse(localStorage.getItem('continueWatching') || '{}');
    const values = Object.values(saved);
    if (values.length > 0) {
      setContinueWatchingData(values.reverse());
    }
    setLoading(false);
  }, []);

  // 🔹 Notify parent if empty
  useEffect(() => {
    if (!loading && onEmptyChange) {
      onEmptyChange(continueWatchingData.length === 0);
    }
  }, [loading, continueWatchingData, onEmptyChange]);

  // 🔹 Remove handler
  const handleRemove = (animeId) => {
    const saved = JSON.parse(localStorage.getItem('continueWatching') || '{}');
    delete saved[animeId];
    localStorage.setItem('continueWatching', JSON.stringify(saved));
    setContinueWatchingData((prev) => prev.filter((item) => item.animeId !== animeId));
    toast.success('', {
      className: '!bg-secondary !text-black !border-0',
      description: 'Anime removed from watch list',
      duration: 2500,
      icon: <IoMdCheckmarkCircle />,
    });
  };

  // 🔹 Redirect
  const handleRedirect = () => {
    if (location.pathname === '/dashboard') {
      window.dispatchEvent(new CustomEvent('dashboardSettingChange', { detail: 'continue-watching' }));
    } else {
      navigate('/dashboard', { state: { setting: 'continue-watching' } });
    }
  };

  // 🔹 Pagination logic (only applies if showAll)
  const totalPages = Math.ceil(continueWatchingData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageItems = useMemo(() => {
    if (showAll) return continueWatchingData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return continueWatchingData.slice(0, 6);
  }, [showAll, continueWatchingData, startIndex]);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🔹 Pagination styling
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
      '&:hover': { backgroundColor: 'var(--color-secondary)' },
    },
  };

  if (!loading && continueWatchingData.length <= 0) return null;

  return (
    <section className={`${showAll ? 'my-5 max-w-[1050px] mx-auto' : 'mb-10'}`}>
      {/* Header */}
      <div className="flex justify-between items-center gap-x-3 mb-4 sm:mb-5">
        <h2 className="text-secondary text-lg sm:text-xl font-bold flex items-center justify-start gap-x-2">
          <GiBackwardTime className="text-3xl" /> <span>Continue Watching</span>
        </h2>

        {!showAll && isAuthenticated && (
          <div
            onClick={handleRedirect}
            className="py-4 px-2 text-sm flex items-center justify-start gap-3 font-medium text-neutral-400 transition-colors duration-300 cursor-pointer hover:text-secondary"
          >
            View more <FaChevronRight />
          </div>
        )}
      </div>

      {/* Grid */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${
          showAll ? 'lg:grid-cols-5' : 'lg:grid-cols-5 xl:grid-cols-6'
        } gap-2`}
      >
        {currentPageItems.map((item) => (
          <ContinueWatchingCard key={item.animeId} anime={item} onRemove={handleRemove} />
        ))}
      </div>

      {/* Pagination (only for showAll) */}
      {showAll && continueWatchingData.length > ITEMS_PER_PAGE && (
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
    </section>
  );
}

export default ContinueWatching;
