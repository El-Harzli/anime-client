/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdSearch } from 'react-icons/io';

import { useParams, useSearchParams } from 'react-router';
import { useEpisodeListContext } from '@context/episodeListContext';


import EpisodeListSkeleton from './EpisodeListSkeleton'; // adjust path if needed

function EpisodesList() {
  const { id } = useParams(); // anime id
  const [searchParams, setSearchParams] = useSearchParams();
  const { animeEpisodeList, currentEpisode, isEpisodeListLoading, episodeListError } = useEpisodeListContext();

  const [watchedEpisodes, setWatchedEpisodes] = useState([]);
  const [page, setPage] = useState(0); // chunk index
  const [searchValue, setSearchValue] = useState(''); // string of digits only
  const [highlightNumber, setHighlightNumber] = useState(null); // episode.number to highlight

  const episodeRefs = useRef({});
  const totalEpisodes = animeEpisodeList?.length || 0;
  const chunkSize = 100;

  // build chunks (array of arrays)
  const chunks = useMemo(() => {
    const c = [];
    for (let i = 0; i < totalEpisodes; i += chunkSize) {
      c.push(animeEpisodeList.slice(i, i + chunkSize));
    }
    return c;
  }, [animeEpisodeList, totalEpisodes]);

  const currentChunk = chunks[page] || [];

  // find index/number of the currently playing episode (if any)
  const activeIndex = useMemo(() => {
    if (!currentEpisode) return -1;
    return animeEpisodeList.findIndex((ep) => String(ep.episodeId) === String(currentEpisode.episodeId));
  }, [animeEpisodeList, currentEpisode?.episodeId]);

  const activePage = activeIndex >= 0 ? Math.floor(activeIndex / chunkSize) : 0;

  // initialize / reset page to active page when episodes/currentEpisode change (only if not searching)
  useEffect(() => {
    if (!searchValue) {
      setPage(activePage);
    }
  }, [activePage, searchValue]);

  // Load watched episodes for this anime
  useEffect(() => {
    const stored = localStorage.getItem('watchedEpisodes');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[id]) {
        setWatchedEpisodes(parsed[id]);
      }
    }
  }, [id]);

  // Save watched episodes
  useEffect(() => {
    if (watchedEpisodes.length === 0) return; // prevent wiping on first render
    const stored = localStorage.getItem('watchedEpisodes');
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[id] = watchedEpisodes;
    localStorage.setItem('watchedEpisodes', JSON.stringify(parsed));
  }, [watchedEpisodes, id]);

  // Automatically mark currentEpisode as watched
  useEffect(() => {
    if (currentEpisode && !watchedEpisodes.includes(currentEpisode.episodeId)) {
      setWatchedEpisodes((prev) => [...prev, currentEpisode.episodeId]);
    }
  }, [currentEpisode?.episodeId]);

  // input change -> allow digits only, switch page to target chunk
  const handleSearchChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setSearchValue(digitsOnly);

    if (digitsOnly === '') {
      // cleared input: stop highlight and revert to active page
      setHighlightNumber(null);
      setPage(activePage);
      return;
    }

    const epNum = parseInt(digitsOnly, 10);
    if (isNaN(epNum) || epNum < 1 || epNum > totalEpisodes) {
      setHighlightNumber(null);
      return;
    }

    // go to the chunk containing that episode
    const targetPage = Math.floor((epNum - 1) / chunkSize);
    setPage(targetPage);
    setHighlightNumber(epNum);
  };

  // scroll searched episode into view when page/search changes
  useEffect(() => {
    if (!searchValue) return;

    const epNum = parseInt(searchValue, 10);
    const el = episodeRefs.current[epNum];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [page, searchValue]);

  const handleEpisodeClick = (episodeId, episodeNumber) => {
    setSearchParams({ ep: episodeId });

    if (!watchedEpisodes.includes(episodeId)) {
      setWatchedEpisodes((prev) => [...prev, episodeId]);
    }

    // clear search when user plays an episode
    setSearchValue('');
    setHighlightNumber(null);
  };



  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex justify-between items-center py-2 px-1 bg-black/50 min-h-fit">
        <div className="flex justify-start items-center flex-wrap gap-2">
          <span className="text-white text-xs min-w-fit">List of episodes:</span>
          {/* pagination dropdown */}
          {totalEpisodes > 100 && (
            <div className="relative">
              <RxHamburgerMenu className="text-gray-50 text-lg absolute left-2  top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                className="border-2 border-gray-400 rounded-md text-gray-400 text-xs ps-6 px-1.5 py-1 bg-black text-center"
                value={page}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setPage(v);
                  // manual switch clears search
                  setSearchValue('');
                  setHighlightNumber(null);
                }}
              >
                {chunks.map((chunk, index) => {
                  const start = index * chunkSize + 1;
                  const end = start + chunk.length - 1;
                  return (
                    <option key={index} value={index}>
                      {start} to {end}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>

        <div className="relative mt-auto">
          <IoMdSearch className="text-gray-50 absolute left-2 top-1/2 -translate-y-1/2  text-lg" />
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            className=" border-gray-600 rounded-md border-2 text-white text-xs ps-7 pe-1.5 py-1.5 w-[130px] bg-black placeholder:text-gray-400"
            type="text"
            placeholder="Number of Ep"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        {/* Episode number input */}
      </header>

      {isEpisodeListLoading ? <EpisodeListSkeleton /> : (
        <div
          className={`
          ${
            isEpisodeListLoading
              ? 'w-full h-full bg-black pb-1 '
              : totalEpisodes > 50
              ? 'grid grid-cols-5 md:grid-cols-8 xl:grid-cols-5 gap-1 p-1 '
              : 'flex flex-col max-h-[750px] overflow-y-auto '
          }`}
        >
          {currentChunk.map((episode, index) => {
            const isCurrent = episode.episodeId == currentEpisode?.episodeId;
            const isWatched = watchedEpisodes.includes(episode.episodeId);
            const isHighlighted = Number(highlightNumber) === Number(episode.number);

            if (totalEpisodes > 50) {
              return (
                <div
                  key={episode.episodeId}
                  ref={(el) => {
                    if (el) episodeRefs.current[Number(episode.number)] = el;
                    else delete episodeRefs.current[Number(episode.number)];
                  }}
                  onClick={() => handleEpisodeClick(episode.episodeId, episode.number)}
                  className={`rounded-xs flex items-center justify-center text-xs px-1 py-2 cursor-pointer 
                  ${
                    isCurrent
                      ? 'bg-secondary text-black'
                      : isWatched
                      ? 'text-white/85 bg-yellow-200/60'
                      : episode.isFiller
                      ? 'bg-amber-300/20 text-white/85 hover:text-secondary'
                      : 'bg-white/10 text-white/85 hover:text-white hover:bg-white/25'
                  } ${isHighlighted ? 'animate-flash ' : ''}`}
                >
                  {episode.number}
                </div>
              );
            }

            return (
              <div
                key={episode.episodeId}
                ref={(el) => {
                  if (el) episodeRefs.current[Number(episode.number)] = el;
                  else delete episodeRefs.current[Number(episode.number)];
                }}
                onClick={() => handleEpisodeClick(episode.episodeId, episode.number)}
                className={`text-sm flex gap-x-5 xl:gap-x-3 items-center justify-start cursor-pointer w-full py-3 px-5 xl:p-3 group hover:bg-white/10
                ${
                  isCurrent
                    ? 'text-secondary bg-white/10'
                    : isWatched
                    ? `text-gray-500 ${index % 2 === 0 ? 'bg-white/3' : ''}`
                    : `text-white/80 ${index % 2 === 0 ? 'bg-white/3' : ''}`
                } ${isHighlighted ? 'animate-flash ' : ''}`}
              >
                <span className="font-medium">{episode.number}</span>
                <span
                  className={`line-clamp-1 w-[80%] ${
                    isCurrent ? 'text-secondary' : isWatched ? 'text-gray-500' : 'group-hover:text-secondary'
                  }`}
                >
                  {episode.title}
                </span>
                {isCurrent && <FaPlayCircle className="text-secondary ml-auto text-lg" />}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes flash {
          0%   { background-color: #ffffff30; }
          20%  { background-color: #ffffff75; }
          50%  { background-color:  #ffffff95; }
          100% { background-color: #ffffff30; }
        }
        .animate-flash {
          animation: flash 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default EpisodesList;
