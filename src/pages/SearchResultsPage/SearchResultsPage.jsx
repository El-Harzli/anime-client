import { useLocation } from 'react-router';
import AnimeListPage from '../../components/layouts/AnimeListPage';

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const endpoint = `search?keyword=${keyword}`;
  return <AnimeListPage title={`Search results for: ${keyword}`} endpoint={endpoint} dataKey="searchResult" />;
}

export default SearchResultsPage;
