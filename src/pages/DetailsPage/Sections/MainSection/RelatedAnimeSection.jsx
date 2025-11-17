import { useState } from 'react';
import SideBarCard from '../../../../components/cards/SideBarCard';
import SideBarCardSkeleton from '../../../../components/cardsSkeleton/SideBarCardSkeleton';
import Button from '@components/shared/Button';

function RelatedAnimeSection({ relatedAnime = [], loading }) {
  const [showAll, setShowAll] = useState(false);

  if (relatedAnime.length === 0 && !loading) return null;

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const displayRelatedAnime = showAll ? relatedAnime : relatedAnime.slice(0, 10);

  return (
    <section className="mb-7">
      <h2 className="mb-1 sm:mb-6 text-lg sm:text-xl font-bold text-secondary">Related Anime</h2>
      <div className="rounded-md bg-white/10 px-5 pt-2 pb-4 ">
        <div className="divide-y  divide-solid">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SideBarCardSkeleton key={i} />)
            : displayRelatedAnime.map((anime) => {
                return <SideBarCard key={anime.id} data={anime} />;
              })}
        </div>

        <Button
          label={showAll ? 'Show less' : 'Show more'}
          customCss="w-full mt-4 text-sm text-white font-medium bg-white/5 backdrop-blur-md"
          handleOnClick={handleToggle}
        />
      </div>
    </section>
  );
}

export default RelatedAnimeSection;
