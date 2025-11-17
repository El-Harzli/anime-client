import MainCard from '@components/cards/MainCard';
import { Link } from 'react-router';
import { FaChevronRight } from 'react-icons/fa';

import { useAnime } from '@context/AnimeContext';
import MainCardSkeleton from '@components/cardsSkeleton/MainCardSkeleton';

function TitledGridSection({ title, animeData = [], endpoint, loading }) {
  // const { loading, error } = useAnime();
  if (animeData.length === 0 && !loading) return null;

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center gap-x-3 mb-1 sm:mb-6">
        <h2 className="text-secondary text-lg sm:text-xl  font-bold">{title}</h2>
        {endpoint && (
          <Link
            to={endpoint}
            className=" py-4 px-2 text-sm flex items-center justify-start gap-3 font-medium text-neutral-400 transition-colors duration-300 cursor-pointer hover:text-secondary"
          >
            View more <FaChevronRight />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 ">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => {
              return <MainCardSkeleton key={i} />;
            })
          : animeData &&
            animeData.map((anime, index) => {
              return <MainCard key={`${anime.id}-${index}`} anime={anime} />;
            })}
      </div>
    </section>
  );
}

export default TitledGridSection;
