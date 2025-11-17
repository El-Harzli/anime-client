import CastCard from '@components/cards/CastCard';
import CastCardSkeleton from '@components/cardsSkeleton/CastCardSkeleton';

function CastSection({ animeCast = [], loading }) {
  // Hide the entire section if there’s no data and not loading
  if (!loading && animeCast.length === 0) return null;

  return (
    <section className="mb-7">
      <h2 className="mb-1 sm:mb-6 text-lg sm:text-xl font-bold text-secondary">
        Characters & Voice Actors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <CastCardSkeleton key={i} />)
          : animeCast.map((cast, index) => <CastCard key={index} data={cast} />)}
      </div>
    </section>
  );
}

export default CastSection;
