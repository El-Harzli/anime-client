import AnimeListPage from '@components/layouts/AnimeListPage';

function RecentlyAddedPage() {
  return <AnimeListPage title="Recently Added" endpoint="recently-added" dataKey="recentlyAddedAnime" />;
}

export default RecentlyAddedPage;
