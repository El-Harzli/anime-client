import PromotionVideosCard from '@components/cards/PromotionVideosCard';
import PromotionVideosCardSkeleton from '@components/cardsSkeleton/PromotionVideosCardSkeleton';

function PromotionVideosSection({ animePromotionVideos = [], loading }) {
  // Hide section if there's no data and not loading
  if (!loading && animePromotionVideos.length === 0) return null;

  return (
    <section className="mb-7">
      <h2 className="mb-1 sm:mb-6 text-lg sm:text-xl font-bold text-secondary">
        Promotion Videos
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <PromotionVideosCardSkeleton key={i} />
            ))
          : animePromotionVideos.map((video, index) => (
              <PromotionVideosCard key={index} data={video} />
            ))}
      </div>
    </section>
  );
}

export default PromotionVideosSection;
