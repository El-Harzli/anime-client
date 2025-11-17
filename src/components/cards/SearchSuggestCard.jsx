import React from 'react';
import { Link } from 'react-router';

function SearchSuggestCard({ anime, setShowSearchDropdown }) {
  return (
    <Link
      to={`/details${anime.href}`}
      onClick={() => setShowSearchDropdown(false)}
      className="flex items-center gap-3 px-2 py-5 hover:bg-white/10 group transition-colors cursor-pointer"
    >
      <div className="w-16 h-20 flex-shrink-0">
        <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover rounded-sm" />
      </div>

      {/* Add min-width: 0 to make truncate work in flex layouts */}
      <div className="flex flex-col items-start  h-fit min-w-0 w-full">
        <h3
          className="font-semibold text-white group-hover:text-secondary truncate whitespace-nowrap overflow-hidden w-full"
          title={anime.title} // optional tooltip
        >
          {anime.title}
        </h3>

        <p className="text-gray-400 text-xs truncate w-full pt-1 pb-3">{anime.japaneseTitle}</p>

        <div className="flex items-center text-xs text-gray-400 flex-wrap">
          <div>{anime.info.duration}</div>
          <div className="w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
          <div className="text-gray-300">{anime?.info?.type || 'TV'}</div>
          <div className="w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
          <div>{anime.info.duration}</div>
        </div>
      </div>
    </Link>
  );
}

export default SearchSuggestCard;
