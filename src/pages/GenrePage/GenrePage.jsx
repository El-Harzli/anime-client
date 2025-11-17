import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import MainWithSidebarLayout from '@components/layouts/MainWithSidebarLayout';
import TitledGridSection from '@components/layouts/TitledGridSection';
import Genres from '@components/widgets/Genres';
import TopX from '@components/widgets/TopX';
import CustomPagination from '@components/shared/CustomPagination';

function GenrePage() {
  const { genre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [animeListByGenre, setAnimeListByGenre] = useState([]);
  const [topAiring, setTopAiring] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/genre/${genre}?page=${page}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch anime data');
        const {data} = await res.json();
        setAnimeListByGenre(data.animeListByGenre || []);
        setTopAiring(data.topAiring || []);
        setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
    return () => controller.abort();
  }, [genre, page]);

  const capitalizeGenre = genre[0].toUpperCase() + genre.slice(1);

  return (
    <div className="mt-5 py-5 bg-white/5">
      <MainWithSidebarLayout>
        <div>
          <TitledGridSection
            title={`${capitalizeGenre} Anime`}
            animeData={animeListByGenre}
            loading={loading}
            error={error}
          />
          {pagination.totalPages > 1 && <CustomPagination pagination={pagination} setSearchParams={setSearchParams} page={page} />}
        </div>
        <div>
          <Genres />
          <TopX title="Top Airing" data={topAiring} />
        </div>
      </MainWithSidebarLayout>
    </div>
  );
}

export default GenrePage;
