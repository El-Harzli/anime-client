import RankCard from '@components/cards/RankCard';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router';

import { useAnime } from '@context/animeContext';
import RankCardSkeleton from '@components/cardsSkeleton/RankCardSkeleton';
function AnimeRankList({ title, animeData, endpoint }) {
  const { loading } = useAnime();

  return (
    <div>
      <h2 className=" mb-4 xl:text-xl font-bold text-secondary ">{title}</h2>

      <div className="flex flex-col divide-y divide-white/10 divide-solid">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => {
              return <RankCardSkeleton key={i} />;
            })
          : animeData &&
            animeData.map((anime) => {
              return <RankCard key={anime.id} anime={anime} />;
            })}
        <Link
          to={endpoint}
          className=" py-4 px-2 flex items-center justify-start gap-3 font-medium text-white transition-colors duration-300 cursor-pointer hover:text-secondary"
        >
          View more <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}

export default AnimeRankList;
