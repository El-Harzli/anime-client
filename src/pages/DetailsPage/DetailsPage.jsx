import { useState } from 'react';
import { useParams } from 'react-router';
import AnimeOverview from './Sections/AnimeOverview';
import AnimeOverviewSkeleton from './Sections/AnimeOverviewSkeleton';

import { useEffect } from 'react';
import MainSection from './Sections/MainSection/MainSection';

function DetailsPage() {
  const { id } = useParams();
  const ENDPOINT = import.meta.env.VITE_API_URL + '/details/' + id;

  const [animeDetails, setAnimeDetails] = useState({});
  const [animeOtherSeasons, setAnimeOtherSeasons] = useState([]);
  const [animeCast, setAnimeCast] = useState([]);
  const [animePromotionVideos, setAnimePromotionVideos] = useState([]);
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const [relatedAnime, setRelatedAnime] = useState([]);
  const [mostPopularAnime, setMostPopularAnime] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchAnimeById = async () => {
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch anime data by id');
        const { data } = await res.json();
        setAnimeDetails(data.details);
        setAnimeOtherSeasons(data.otherSeasons);
        setAnimeCast(data.cast);
        setAnimePromotionVideos(data.promotionVideos);
        setRecommendedAnime(data.recommendedAnime);
        setRelatedAnime(data.relatedAnime);
        setMostPopularAnime(data.mostPopularAnime);
        requestAnimationFrame(() => setLoading(false));
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnimeById();

    return () => {
      console.log('Cleanup called. Abort fetching anime by id data...');
      controller.abort();
    };
  }, [id, ENDPOINT]);

  return (
    <div className="w-full my-container">
      {loading ? <AnimeOverviewSkeleton /> : animeDetails && <AnimeOverview animeDetails={animeDetails} />}

      <MainSection
        animeOtherSeasons={animeOtherSeasons}
        animeCast={animeCast}
        animePromotionVideos={animePromotionVideos}
        recommendedAnime={recommendedAnime}
        relatedAnime={relatedAnime}
        mostPopularAnime={mostPopularAnime}
        loading={loading}
      />
    </div>
  );
  // return <div className="px-3">{animeDetails && !loading && <DetailsSection2 animeDetails={animeDetails} />}</div>;
}

export default DetailsPage;
