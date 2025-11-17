import Badges from '../shared/Badges';
import { Link } from 'react-router';
import PreviewCard from './PreviewCard';
import { useState } from 'react';
import useOverflowDetection from '@hooks/useOverflowDetection';

function RankCard({ anime }) {
  const [showPreviewCard, setShowPreviewCard] = useState(false);

  const { isOverflowing, previewRef } = useOverflowDetection(showPreviewCard);

  return (
    <article className="flex py-5 h-30 gap-6 justify-start items-center">
      <div
        className="h-20 w-15 relative shrink-0"
        onMouseEnter={() => setShowPreviewCard(true)}
        onMouseLeave={() => setShowPreviewCard(false)}
      >
        <Link to={`/details/${anime.id}`}>
          <img
            src={anime.poster}
            className="h-full w-full object-cover bg-center rounded-md cursor-pointer "
            alt={anime.title}
          />
        </Link>
        {/* PreviewCard */}
        {anime && showPreviewCard && (
          <div
            ref={previewRef}
            className={`absolute z-40 top-1/2 ${isOverflowing ? 'right-1/2' : 'left-1/2'}`}
          >
            <PreviewCard anime={anime} />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <Link to={`/details/${anime.id}`}>
          <h2 className="text-white text-start font-medium text-sm line-clamp-2 mb-3 hover:text-secondary transition-colors duration-300 cursor-pointer">
            {anime.title}
          </h2>
        </Link>
        {/* <div className="text-white text-start font-medium text-lg ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque dignissimos recusandae deserunt sunt similique officia alias animi quas nam? Pariatur?</div> */}
        <Badges sub={anime.episodes.sub} dub={anime.episodes.dub} />
      </div>
    </article>
  );
}

export default RankCard;
