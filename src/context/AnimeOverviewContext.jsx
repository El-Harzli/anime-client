import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

const AnimeOverviewContext = createContext();

export const AnimeOverviewProvider = ({ children }) => {
  const { id } = useParams(); // anime id from route
  const [animeOverview, setAnimeOverview] = useState(null);
  const [isOverviewLoading, setIsOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchAnimeDetails = async () => {
      setIsOverviewLoading(true);
      setOverviewError(null);
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/details/${id}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch anime overview');
        const { data } = await res.json();
        setAnimeOverview(data);
      } catch (err) {
        if (err.name !== 'AbortError') setOverviewError(err.message);
      } finally {
        setIsOverviewLoading(false);
      }
    };

    fetchAnimeDetails();
    return () => controller.abort();
  }, [id]);

  return (
    <AnimeOverviewContext.Provider value={{ animeOverview, isOverviewLoading, overviewError }}>
      {children}
    </AnimeOverviewContext.Provider>
  );
};

export const useAnimeOverview = () => {
  return useContext(AnimeOverviewContext);
};
