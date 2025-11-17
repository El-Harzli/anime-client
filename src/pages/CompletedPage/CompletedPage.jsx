import AnimeListPage from '@components/layouts/AnimeListPage';

function CompletedPage() {
  return <AnimeListPage title="Completed" endpoint="completed" dataKey="completedAnime" />;
}

export default CompletedPage;
