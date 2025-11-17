import SeasonsNavigatorSection from './SeasonsNavigatorSection';
import CastSection from './CastSection';
import CastCardSkeleton from '../../../../components/cardsSkeleton/CastCardSkeleton';
import PromotionVideosSection from './PromotionVideosSection';
import TitledGridSection from '@components/layouts/TitledGridSection';
import RelatedAnimeSection from './RelatedAnimeSection';
import MostPopularSection from './MostPopularSection';
import MainWithSidebarLayout from '@components/layouts/MainWithSidebarLayout';

function MainSection({
  animeOtherSeasons,
  animeCast,
  animePromotionVideos,
  recommendedAnime,
  relatedAnime,
  mostPopularAnime,
  loading,
}) {
  return (
    <MainWithSidebarLayout>
      <div>
        <SeasonsNavigatorSection animeOtherSeasons={animeOtherSeasons} loading={loading} />
        {/* 👇 Automatically handles both loading and no-data cases */}
        <CastSection animeCast={animeCast} loading={loading} />
        <PromotionVideosSection animePromotionVideos={animePromotionVideos} loading={loading} />
        <TitledGridSection title="Recommended for you" animeData={recommendedAnime} loading={loading} />{' '}
      </div>

      <div>
        <RelatedAnimeSection relatedAnime={relatedAnime} loading={loading} />
        <MostPopularSection mostPopularAnime={mostPopularAnime} loading={loading} />
      </div>
    </MainWithSidebarLayout>
  );
}

export default MainSection;
