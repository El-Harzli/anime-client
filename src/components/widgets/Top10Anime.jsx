import { useState, useEffect } from 'react';
import { useAnime } from '@context/AnimeContext';
import RankCard from '@components/cards/RankCard';
import RankCardSkeleton from '@components/cardsSkeleton/RankCardSkeleton';

function Top10Anime() {
  const { animeData, loading } = useAnime();

  const [top10Anime, setTop10Anime] = useState({
    today: [],
    week: [],
    month: [],
  });
  const [active, setActive] = useState('today');

  useEffect(() => {
    if (animeData?.top10) {
      setTop10Anime(animeData.top10);
    }
  }, [animeData]);

  const activeList = top10Anime[active] || [];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-1 sm:mb-6">
        <h2 className="text-secondary text-lg sm:text-xl  font-bold">Top 10</h2>
        <div className="flex justify-end items-center text-white rounded-lg overflow-hidden">
          <div
            onClick={() => setActive('today')}
            className={`cursor-pointer text-sm font-medium px-3.5 py-3 ${
              active === 'today' ? 'bg-secondary text-black' : 'bg-white/10 hover:text-secondary backdrop-blur-md'
            }`}
          >
            Today
          </div>
          <div
            onClick={() => setActive('week')}
            className={`cursor-pointer text-sm font-medium px-3.5 py-3 ${
              active === 'week' ? 'bg-secondary text-black' : 'bg-white/10 hover:text-secondary backdrop-blur-md'
            }`}
          >
            Week
          </div>
          <div
            onClick={() => setActive('month')}
            className={`cursor-pointer text-sm font-medium px-3.5 py-3 ${
              active === 'month' ? 'bg-secondary text-black' : 'bg-white/10 hover:text-secondary backdrop-blur-md'
            }`}
          >
            Month
          </div>
        </div>
      </div>

      {/* Top 10 list */}
      <div className="w-full divide-y divide-white/10 divide-solid bg-white/10 backdrop-blur-md rounded-md">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-6 xl:gap-4 xl:pe-3 xl:ps-4 pe-2 ps-4 sm:pe-4 sm:ps-10"
                >
                  <div
                    className={`text-lg  ${
                      [0, 1, 2].includes(i)
                        ? 'text-white pb-1 border-b-4 border-secondary'
                        : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <RankCardSkeleton />;
                </div>
              );
            })
          : activeList &&
            activeList.map((anime, index) => {
              return (
                <div
                  key={anime.id || index}
                  className="flex items-center gap-3 sm:gap-6 xl:gap-4 xl:pe-3 xl:ps-4 pe-2 ps-4 sm:pe-4 sm:ps-10 group"
                >
                  <div
                    className={`text-lg  ${
                      [0, 1, 2].includes(index)
                        ? 'text-white pb-1 border-b-4 border-secondary'
                        : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <RankCard anime={anime} />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Top10Anime;
