import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAnime } from '@context/AnimeContext';
import Button from '@components/shared/Button';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Genres() {
  const { animeData, loading } = useAnime(); // if you track loading in context

  const [animeGenres, setAnimeGenres] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const colors = [
    'text-lime-200',
    'text-secondary',
    'text-orange-300',
    'text-violet-400',
    'text-sky-300',
    'text-teal-400',
    'text-yellow-500',
  ];

  useEffect(() => {
    if (animeData?.genres) {
      setAnimeGenres(animeData.genres);
    }
  }, [animeData]);

  const handleToggle = () => setShowAll((prev) => !prev);
  const displayedGenres = showAll ? animeGenres : animeGenres.slice(0, 24);

  const baseColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-base')
    .trim();
  const highlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-highlight')
    .trim();

  return (
    <div className="w-full mb-12">
      {/* Title */}
      <h2 className="text-secondary text-lg sm:text-xl mb-1 sm:mb-6 font-bold">
        Genres
      </h2>

      <div className="p-3 rounded-md bg-white/10 backdrop-blur-md">
        <div className="flex flex-wrap sm:grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-3 gap-1">
          {loading || !animeGenres.length
            ? Array.from({ length: 24 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  height={25}
                  width={"100%"}
                  baseColor={baseColor}
                  highlightColor={highlightColor}
                  borderRadius={6}
                  className="mb-1"
                />
              ))
            : displayedGenres.map((genre, index) => {
                const colorClass = colors[index % colors.length];
                const capilatizeGenre =
                  genre[0].toUpperCase() + genre.slice(1);
                return (
                  <Link
                    to={`/genre/${genre
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '')}`}
                    key={genre}
                    className={`cursor-pointer text-xs px-3 py-3 truncate min-w-0 font-medium ${colorClass} hover:bg-white/5 hover:backdrop-blur-md rounded-md`}
                  >
                    {capilatizeGenre}
                  </Link>
                );
              })}
        </div>

        {animeGenres.length > 24 && !loading && (
          <Button
            label={showAll ? 'Show less' : 'Show more'}
            customCss="w-full mt-4 text-sm text-white font-medium bg-white/5 backdrop-blur-md"
            handleOnClick={handleToggle}
          />
        )}

        {/* Optional: skeleton for the button */}
        {loading && animeGenres.length > 24 && (
          <Skeleton
            height={36}
            width="100%"
            baseColor={baseColor}
            highlightColor={highlightColor}
            borderRadius={6}
            className="mt-4"
          />
        )}
      </div>
    </div>
  );
}

export default Genres;
