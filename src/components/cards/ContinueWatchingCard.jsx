import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import Badges from '../shared/Badges';
import { Link } from 'react-router';
import { IoMdClose } from 'react-icons/io';

function ContinueWatchingCard({ anime, onRemove }) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  const formattedCurrentTime = formatTime(anime.currentTime);
  const formattedDuration = formatTime(anime.duration);
  const progress = (anime.currentTime / anime.duration) * 100;

  // 🔹 Remove click handler
  const handleRemoveFromContinueWatching = (e) => {
    e.stopPropagation(); // prevent triggering Link
    e.preventDefault();
    if (onRemove) onRemove(anime.animeId);
  };

  return (
    <article className="flex flex-col items-start w-full">
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* ❌ Remove button */}
        <button
          onClick={handleRemoveFromContinueWatching}
          className={`absolute top-0 right-0 z-40 cursor-pointer mt-1 mr-1 transition-opacity duration-200 ${
            isCardHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <IoMdClose className="text-3xl text-white" />
        </button>

        <Link
          to={`/watch/${anime.animeId}?ep=${anime.episode}`}
          className="relative block w-full h-full overflow-hidden group"
        >
          <div
            className="w-full h-full relative
              after:content-[''] 
              after:absolute 
              after:top-[40%] after:left-0 after:right-0 after:bottom-0 
              after:z-2 after:pointer-events-none
              after:bg-[linear-gradient(0deg,#201f31_0%,rgba(32,31,49,0)_40%)]"
          >
            <FaPlay
              className={`absolute ${
                isCardHovered ? 'opacity-100' : ''
              } z-40 text-3xl text-white transition duration-300 -translate-x-1/2 -translate-y-1/2 opacity-0 left-1/2 top-1/2`}
            />

            <div className="absolute z-30 bottom-1 left-1 md:bottom-2 md:left-2 xl:bottom-3 xl:left-3">
              <Badges sub={anime?.episodes?.sub} dub={anime?.episodes?.dub} />
            </div>

            <img
              className={`w-full h-full object-cover rounded-md transition-all duration-300 z-10 cursor-pointer ${
                isCardHovered ? 'blur-sm' : ''
              }`}
              src={anime.poster}
              alt={anime.title}
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-start w-full gap-1 py-2">
        <h2 className="text-sm font-medium text-white line-clamp-1">{anime.title}</h2>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-neutral-300 text-sm mt-1 mb-2">
            <div>EP {anime.latestEpisodeWatched}</div>
            <div>
              <span className="text-secondary">{formattedCurrentTime}</span>
              {' / '}
              <span>{formattedDuration}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-[3px] bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ContinueWatchingCard;
