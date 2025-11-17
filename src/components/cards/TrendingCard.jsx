import { useState, useRef } from 'react';
import { Link } from 'react-router'; // if you use react-router-dom, change to "react-router-dom"
import PreviewPortal from './PreviewPortal';
import PreviewCard from './PreviewCard';
import useOverflowDetection from '../../hooks/useOverflowDetection';

function TrendingCard({ anime, index }) {
  const [showPreviewCard, setShowPreviewCard] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  const { isOverflowing, previewRef } = useOverflowDetection(showPreviewCard);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setShowPreviewCard(true);
  };

  const handleMouseLeave = () => {
    setShowPreviewCard(false);
  };

  return (
    <div ref={cardRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={`/details/${anime.id}`}>
        <article className="relative flex gap-1 h-50 md:h-55 lg:h-60 xl:h-65 w-full cursor-pointer">
          <div className="hidden sm:flex flex-col-reverse gap-4 items-center">
            <div className="text-secondary font-semibold">{String(index).padStart(2, '0')}</div>
            <div className="[writing-mode:vertical-rl] rotate-180 text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis h-40">
              {anime.title}
            </div>
          </div>
          <div className="absolute size-7 bg-white text-black text-center font-bold flex items-center justify-center sm:hidden">
            {String(index).padStart(2, '0')}
          </div>
          <div className="w-full h-full">
            <img className=" h-full w-full object-cover" src={anime.poster} alt={anime.title} />
          </div>
        </article>
      </Link>

      {anime && showPreviewCard && (
        <PreviewPortal>
          <div
            ref={previewRef}
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              transform: isOverflowing ? 'translateX(-100%) translateY(0%)' : 'none',
              zIndex: 9999,
            }}
          >
            <PreviewCard anime={anime} />
          </div>
        </PreviewPortal>
      )}
    </div>
  );
}

export default TrendingCard;
