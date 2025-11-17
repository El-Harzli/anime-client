import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import Badges from '../shared/Badges';
import { Link } from 'react-router';
import PreviewCard from './PreviewCard';
import useOverflowDetection from '@hooks/useOverflowDetection';

function MainCard({ anime }) {
  const [showPreviewCard, setShowPreviewCard] = useState(false);

  // Use the custom hook for overflow detection
  const { isOverflowing, previewRef } = useOverflowDetection(showPreviewCard);

  return (
    <article className="flex flex-col items-start w-full">
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setShowPreviewCard(true)}
        onMouseLeave={() => setShowPreviewCard(false)}
      >
        <Link to={`/details/${anime.id}`} className="relative block w-full h-full overflow-hidden group">
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
                showPreviewCard ? 'opacity-100' : ''
              } z-40 text-3xl text-white transition duration-300 -translate-x-1/2 -translate-y-1/2 opacity-0 left-1/2 top-1/2`}
            />

            <div className="absolute z-30 bottom-1 left-1 md:bottom-2 md:left-2 xl:bottom-3 xl:left-3">
              <Badges sub={anime.episodes.sub} dub={anime.episodes.dub} />
            </div>

            <img
              className={`w-full h-full object-cover rounded-md transition-all duration-300 z-10 cursor-pointer ${
                showPreviewCard ? 'blur-sm' : ''
              }`}
              src={anime.poster}
              alt={anime.title}
            />
          </div>
        </Link>

        {/* Use ref from the custom hook and apply overflow detection */}
        {showPreviewCard && (
          <div ref={previewRef} className={`absolute z-40 top-1/2 ${isOverflowing ? 'right-1/2' : 'left-1/2'}`}>
            <PreviewCard id={anime.id} anime={anime} />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-start w-full gap-1 py-2">
        <h2 className="text-sm font-medium text-white line-clamp-1">{anime.title}</h2>
        <div className="flex items-center justify-start text-sm text-gray-400 flex-wrap max-h-[calc(1rem+4px)] overflow-hidden">
          <div className="w-fit">{anime.type}</div>
          <div className="size-1.5 bg-white/30 backdrop-blur-md rounded-full mx-2"></div>
          <div>{anime.duration}</div>
        </div>
      </div>
    </article>
  );
}

export default MainCard;
