import { useParams } from 'react-router';
import SeasonCard from '../../../../components/cards/SeasonCard';
import SeasonCardSkeleton from '../../../../components/cardsSkeleton/SeasonCardSkeleton';

function SeasonsNavigatorSection({ animeOtherSeasons = [], loading }) {
  const { id } = useParams();
  if (animeOtherSeasons.length === 0 && !loading) return null;

  return (
    <section className="w-full mb-8">
      <h3 className="mb-1 sm:mb-6 text-lg sm:text-xl font-bold text-secondary">More Seasons</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 items-center gap-4">
        {loading ? (
          <>
            <SeasonCardSkeleton />
            <SeasonCardSkeleton />
          </>
        ) : (
          animeOtherSeasons.map((season, index) => <SeasonCard key={index} season={season} id={id} />)
        )}
      </div>
    </section>
  );
}

export default SeasonsNavigatorSection;
