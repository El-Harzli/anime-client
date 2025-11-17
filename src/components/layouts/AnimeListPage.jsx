import { useParams, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

import CustomPagination from '@components/shared/CustomPagination';
import MainWithSidebarLayout from '@components/layouts/MainWithSidebarLayout';
import TitledGridSection from '@components/layouts/TitledGridSection';
import Top10Anime from '@components/widgets/Top10Anime';
import Genres from '@components/widgets/Genres';

function AnimeListPage({ title, endpoint, dataKey }) {
  // These three lines below are needed to make the AnimeListPage work for
  // for All the common pages that follow the same layout
  // /producer endpoint expects an id, unlike the other endpoints
  // so we've created these three lines to make it sync with the others
  const { id } = useParams(); // gets the dynamic part from /producer/:id
  const finalEndpoint = endpoint === 'producer' ? `producer/${id}` : endpoint;
  const finalTitle =
    endpoint === 'producer'
      ? `${id
          .split('-') // Split at hyphens
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
          .join(' ')} Anime`
      : title;

  // end of producer endpoint

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [animeData, setAnimeData] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/${finalEndpoint}${
          finalEndpoint.includes('keyword') ? '&' : '?'
        }page=${page}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch anime data');
        const data = await res.json();

        setAnimeData(data[dataKey] || []); // assumes API returns same key as endpoint
        setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
    return () => controller.abort();
  }, [page, endpoint]);

  return (
    <div className="mt-5 py-5 bg-white/5">
      <MainWithSidebarLayout>
        <div>
          <TitledGridSection title={finalTitle} animeData={animeData} loading={loading} />
          {pagination.totalPages > 1 && (
            <CustomPagination pagination={pagination} setSearchParams={setSearchParams} page={page} />
          )}
        </div>
        <div>
          <Top10Anime />
          <Genres />
        </div>
      </MainWithSidebarLayout>
    </div>
  );
}

export default AnimeListPage;
