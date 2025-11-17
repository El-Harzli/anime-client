import TopX from '@components/widgets/TopX';
function MostPopularSection({ mostPopularAnime, loading }) {
  return <TopX title="Most Popular" data={mostPopularAnime} loading={loading} />;
}

export default MostPopularSection;
